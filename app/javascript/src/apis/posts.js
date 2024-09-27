import axios from "axios";

const fetch = () => axios.get("/posts");

const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const update_votes = (_slug, voteType, upvoteClicked, downvoteClicked) =>
  axios.patch("/posts/${slug}/update_votes", {
    vote_type: voteType,
    upvote_clicked: upvoteClicked,
    downvote_clicked: downvoteClicked,
  });

const postsApi = { fetch, show, create, update_votes };

export default postsApi;
