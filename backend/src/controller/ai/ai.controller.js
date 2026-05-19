import { generateReviewSummary} from "../../services/aiReviewService.js";
import {StatusCodes} from "http-status-codes"

export const getReviewSummary =
async (req, res) => {
  

  const result =
    await generateReviewSummary(
      req.params.productId
    );

    
    return res.status(StatusCodes.OK).json({result ,message:"fetch review"});
  
};