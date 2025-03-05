import api from "@/config/api";
import * as actionTypes from "./ActionType"


export const fetchIssues = (projectId) => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });

  try {
    const token = localStorage.getItem("jwt"); // Fetch token from storage

    if (!token) {
      throw new Error("User not authenticated. Token is missing.");
    }

    const response = await api.get(`/api/issues/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: actionTypes.FETCH_ISSUES_SUCCESS,
      issues: response.data,
    });
  } catch (error) {
    console.error("Fetch Issues Error:", error);
    dispatch({
      type: actionTypes.FETCH_ISSUES_FAILURE,
      error: error.message,
    });
  }
};


export const deleteIssue = (issueId, projectId) => {
  return async (dispatch) => {
    console.log("deleteIssue called with:", { issueId, projectId }); // Debugging

    if (!issueId) {
      console.error("Issue ID is undefined, cannot delete");
      return;
    }

    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });

    try {
      console.log(`Sending DELETE request to /api/issues/${issueId}`);
      await api.delete(`/api/issues/${issueId}`);

      dispatch({
        type: actionTypes.DELETE_ISSUE_SUCCESS,
        issueId,
      });

      console.log("Issue deleted successfully:", issueId);

      if (projectId) {
        console.log("Fetching issues for project:", projectId);
        dispatch(fetchIssues(projectId));  
      }
    } catch (error) {
      console.error("Error deleting issue:", error);
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};



export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });

    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("User not authenticated. Token is missing.");

      const response = await api.post("/api/issues", issueData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data,
      });

      console.log("Issue Created....", response.data);

      const projectId = issueData.projectId || response.data.projectId;
      dispatch(fetchIssues(projectId));
    } catch (error) {
      console.error("Error creating issue:", error.response?.data || error.message);
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};


export const fetchComments = (issueId) => {
  return async (dispatch) => {
      if (!issueId) {
          console.error("Issue ID is missing"); // Log an error if issueId is missing
          return;
      }

      dispatch({ type: actionTypes.FETCH_COMMENTS_REQUEST });
      try {
          const response = await api.get(`/api/comments/${issueId}`);
          dispatch({
              type: actionTypes.FETCH_COMMENTS_SUCCESS,
              comments: response.data,
          });
          console.log("Fetched comments", response.data);
      } catch (error) {
          console.log("Error", error);
          dispatch({
              type: actionTypes.FETCH_COMMENTS_FAILURE,
              error: error.message,
          });
      }
  };
};


export const updateIssueStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
    try {
        const response = await api.put(`/api/issues/${id}/status/${status}`);
        console.log("update issue  status--- ", response.data);
        dispatch({
          type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
          issue: response.data,
        });
      } catch (error) {
        console.log("error", error);
        dispatch({
          type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE, 
          error: error.message,
        });
      }
  };
};


export const assignedUserToIssue = ({ issueId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
      console.log("assigned issue --- ", response.data);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};
