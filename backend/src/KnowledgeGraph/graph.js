import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

// =========================
// CREATE DRIVER
// =========================
const driver = neo4j.driver(
  process.env.NEO4J_URI,

  neo4j.auth.basic(
    process.env.NEO4J_USERNAME,
    process.env.NEO4J_PASSWORD
  )
);

// =========================
// VERIFY CONNECTION
// =========================
export async function connectNeo4j() {

  try {

    await driver.verifyConnectivity();

    console.log("✅ Neo4j Connected");

  } catch (err) {

    console.error("❌ Neo4j Connection Error");
    console.error(err);
  }
}

// =========================
// ADD TRIPLES
// =========================
export async function addTriples(triples) {

  const session = driver.session();

  try {

    for (const triple of triples) {

      const safeRelation = triple.relation
        .replace(/[^a-zA-Z0-9_]/g, "_")
        .toUpperCase();

      const query = `
        MERGE (s:${triple.subjectType} {
          name: $subject
        })

        MERGE (o:${triple.objectType} {
          name: $object
        })

        MERGE (s)-[r:${safeRelation}]->(o)
      `;

      await session.run(query, {

        subject: triple.subject,
        object: triple.object

      });
    }

    console.log("✅ Triples Added");

  } catch (err) {

    console.error("❌ addTriples ERROR");
    console.error(err);

  } finally {

    await session.close();
  }
}

// =========================
// QUERY FACTS
// =========================
export async function queryFacts(text) {

  const session = driver.session();

  try {

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter(w => w.length > 2);

    const cypherQuery = `
      MATCH (s)-[r]->(o)

      WHERE
        ANY(word IN $words WHERE
          toLower(s.name) CONTAINS word
          OR toLower(o.name) CONTAINS word
          OR toLower(type(r)) CONTAINS word
        )

      RETURN
        s.name AS subject,
        labels(s)[0] AS subjectType,

        type(r) AS relation,

        o.name AS object,
        labels(o)[0] AS objectType

      LIMIT 10
    `;

    const result = await session.run(
      cypherQuery,
      { words }
    );

    return result.records.map(r => ({
      subject: r.get("subject"),
      subjectType: r.get("subjectType"),

      relation: r.get("relation"),

      object: r.get("object"),
      objectType: r.get("objectType")
    }));

  } catch (err) {

    console.error("❌ queryFacts ERROR");
    console.error(err);

    return [];

  } finally {

    await session.close();
  }
}