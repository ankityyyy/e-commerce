import Order from "../models/order.js";
import Product from "../models/Product.js";
import User from "../models/user.js";
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
});

export const adminDashboard = async (req, res) => {
  console.log("req come")
  try {
    const [orders, products, users] = await Promise.all([
      Order.find(),
      Product.find(),
      User.find(),
    ]);

    // =================================================
    // STEP 1: DATE HELPERS
    // =================================================
    const today = new Date().toDateString();

    const todayOrdersData = orders.filter(
      (o) => new Date(o.createdAt).toDateString() === today
    );

    const todayOrders = todayOrdersData.length;

    const todayRevenue = todayOrdersData.reduce(
      (acc, o) => acc + (o.totalAmount || 0),
      0
    );

    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalUsers = users.length;

    // =================================================
    // STEP 2: SALES GRAPH (LAST 7 DAYS)
    // =================================================
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toDateString();
      })
      .reverse();

    const salesMap = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt).toDateString();
      salesMap[date] =
        (salesMap[date] || 0) + (order.totalAmount || 0);
    });

    const salesGraph = last7Days.map((day) => ({
      day,
      sales: salesMap[day] || 0,
    }));

    // =================================================
    // STEP 3: CATEGORY GRAPH
    // =================================================
    const categoryMap = {};

    products.forEach((p) => {
      const cat = p.category || "Unknown";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const categoryGraph = Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    // =================================================
    // STEP 4: PRODUCT SALES (for AI insights)
    // =================================================
    const productSales = {};

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        const id = item.productId.toString();
        productSales[id] =
          (productSales[id] || 0) + (item.quantity || 0);
      });
    });

    const productList = Object.entries(productSales).map(
      ([productId, qty]) => {
        const product = products.find(
          (p) => p._id.toString() === productId
        );

        return {
          name: product?.name || "Unknown",
          category: product?.category || "Unknown",
          quantity: qty,
          stock: product?.stock || 0,
        };
      }
    );

    // =================================================
    // STEP 5: AI PROMPT
    // =================================================
    const prompt = `
You are an ecommerce data analyst.

Return ONLY valid JSON in this format:

{
  "aiSalesSummary": [],
  "aiProductInsights": []
}

DATA:

Today's Orders: ${todayOrders}
Today's Revenue: ${todayRevenue}
Total Orders: ${totalOrders}

Top Products:
${JSON.stringify(productList.slice(0, 5), null, 2)}

Category Distribution:
${JSON.stringify(categoryGraph, null, 2)}

Sales Graph:
${JSON.stringify(salesGraph, null, 2)}

Rules:
- aiSalesSummary: 3 short business insights
- aiProductInsights: 3 product-level insights
- Keep it simple and actionable
`;

    // =================================================
    // STEP 6: CALL AI
    // =================================================
    let aiSalesSummary = [];
    let aiProductInsights = [];

    try {
      const aiRes = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const raw = aiRes.choices[0].message.content;

      const parsed = JSON.parse(raw);

      aiSalesSummary = parsed.aiSalesSummary || [];
      aiProductInsights = parsed.aiProductInsights || [];
    } catch (e) {
      console.log("AI parse error:", e.message);
    }

    console.log(aiSalesSummary)
    console.log( aiProductInsights)
    // =================================================
    // STEP 7: FINAL RESPONSE
    // =================================================
    return res.json({
      stats: {
        todayOrders,
        todayRevenue,
        totalProducts,
        totalUsers,
        totalOrders,
      },

      salesGraph,
      categoryGraph,

      aiSalesSummary,
      aiProductInsights,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Dashboard error",
    });
  }
};