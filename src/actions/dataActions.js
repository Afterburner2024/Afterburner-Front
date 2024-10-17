import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../utils/supabase";

const fetchAllData = createAsyncThunk("data/fetchAllData", async () => {
  try {
    const { data: afterburner, error: afterburnerError } = await supabase
      .from("afterburner")
      .select("id, afterburner_title, afterburner_contents");

    const { data: functions, error: functionsError } = await supabase
      .from("functions")
      .select(
        "id, func_title1, func_title2, func_title3, func_contents1, func_contents2, func_contents3",
      );

    const { data: introduction, error: introductionError } = await supabase
      .from("introduction")
      .select("id, intro_title1, intro_title2, intro_contents");

    const { data: main, error: mainError } = await supabase
      .from("main")
      .select("id, main_title1, main_title2, main_sub_title");

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select(
        "id, review_name1, review_contents1, review_name2, review_contents2, review_name3, review_contents3, review_name4, review_contents4, review_name5, review_contents5",
      );

    const { data: contributor, error: contributorError } = await supabase
      .from("contributor")
      .select("id, contributor_username, contributor_name");

    if (
      afterburnerError ||
      functionsError ||
      introductionError ||
      mainError ||
      reviewsError ||
      contributorError
    ) {
      throw new Error("Error fetching data from one or more tables.");
    }

    return {
      afterburner,
      functions,
      introduction,
      main,
      reviews,
      contributor,
    };
  } catch (error) {
    // console.error("Error in fetchAllData:", error);
    throw error;
  }
});

export default fetchAllData;
