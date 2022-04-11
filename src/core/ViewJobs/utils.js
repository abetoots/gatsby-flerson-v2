/**
 * Motivation: We want to filter our posts based on how many days ago.
 * When we call groupByDateAfterDaysAgo(), it should return the posts that match our logical condition (ex: get posts 7 days ago)
 *
 * Inefficiency problem: If we want to get posts 7 days ago, we .filter() over all our posts and return matches.
 * If we want to get posts 30 days ago, we need to call the function again and it iterates over ALL our posts again.
 * This seems inefficient for large sets of data
 *
 * Solution: (premature optimization maybe?) Instead of using .filter() multiple times, we use a for loop instead.
 * Concept: We also want to return posts that didn't match our condition so we can choose to iterate over
 * that if we want.
 */

import { STICKY_MONTH, STICKY_WEEK } from "@Shared/utils/constants";

export const groupByDateAfterDaysAgo = (
  posts,
  daysAgo,
  dateAccessor = "date"
) => {
  const matchedPosts = [];
  const unMatchedPosts = [];
  for (let i = 0, l = posts.length; i < l; i++) {
    const datePublished = new Date(posts[i][dateAccessor]);
    //!Note: Always remember if you want to calculate against "today" (hour zero/midnight) vs "now" [as in new Date()]
    //example logical error we had: we were getting posts 1 day before 'now' instead of 1 day before 'today'
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const dateConditionMs = today.getTime() - daysAgo * 86400000;
    if (datePublished.getTime() > dateConditionMs) {
      matchedPosts.push(posts[i]);
    } else {
      unMatchedPosts.push(posts[i]);
    }
  }
  return { results: matchedPosts, remaining: unMatchedPosts };
};

export const getStickyPosts = (posts) => {
  const matchedPosts = [];
  const unMatchedPosts = [];
  const dateNow = new Date();
  let stickyValid;
  for (let i = 0, l = posts.length; i < l; i++) {
    stickyValid = posts[i].stickyUntil
      ? new Date(posts[i].stickyUntil) > dateNow
        ? true
        : false
      : false;
    if (
      (posts[i].addOns[STICKY_MONTH] || posts[i].addOns[STICKY_WEEK]) &&
      stickyValid
    ) {
      matchedPosts.push(posts[i]);
    } else {
      unMatchedPosts.push(posts[i]);
    }
  }
  return { results: matchedPosts, remaining: unMatchedPosts };
};
