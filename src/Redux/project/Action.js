import api from "@/config/api"
import { ACCEPT_INVITATION_REQUEST, ACCEPT_INVITATION_SUCCESS,CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,CREATE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_REQUEST, INVITE_TO_PROJECT_REQUEST, 
    INVITE_TO_PROJECT_SUCCESS,FETCH_PROJECT_SUCCESS, SEARCH_PROJECT_SUCCESS,SEARCH_PROJECT_REQUEST } from "./ActionType";

export const fetchProject = ({category,tag})=>async(dispatch)=>{
    dispatch({type:FETCH_PROJECT_REQUEST})
    try{
        const {data} = await api.get("api/projects",{params:{category,tag}});
        console.log("All projects",data);
        dispatch({type:FETCH_PROJECT_SUCCESS,projects:data})

    }catch(error){
        console.log("Error",error);

    }
}
export const searchProject = ({keyword})=>async(dispatch)=>{
    dispatch({type:SEARCH_PROJECT_REQUEST})
    try{
        const {data} = await api.get(`api/projects/search?keyword=${keyword}`);
        console.log("Search projects",data);
        dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data})

    }catch(error){
        console.log("Error",error);

    }
}

export const createProject = (projectData) => async (dispatch, getState) => {
    dispatch({ type: CREATE_PROJECT_REQUEST });

    try {
        const { data } = await api.post("api/projects", projectData);
        console.log("Created project:", data);

        const existingProjects = getState().project.projects || [];

        dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });


    } catch (error) {
        console.log("Error:", error);
        dispatch({ type: CREATE_PROJECT_FAILURE, error: error.message });
    }
};



export const fetchProjectById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`api/projects/${id}`);
        console.log("Project details:", data);

        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
    } catch (error) {
        console.log("Error fetching project:", error);
        dispatch({ type: "FETCH_PROJECT_BY_ID_FAILURE", error: error.message });
    }
};

  

export const deleteProject = (projectId)=>async(dispatch)=>{
    dispatch({type:DELETE_PROJECT_REQUEST})
    try{
        const {data} = await api.delete(`/api/projects/${projectId}`);
        console.log("Delete projects",data);
        dispatch({type:DELETE_PROJECT_SUCCESS,projectId})

    }catch(error){
        console.log("Error",error);

    }
}

export const inviteToProject = ({email,projectId})=>async(dispatch)=>{
    dispatch({type:INVITE_TO_PROJECT_REQUEST})
    try{
        const {data} = await api.post("api/projects/invite",{email,projectId});
        console.log("invite projects",data);
        dispatch({type:INVITE_TO_PROJECT_SUCCESS,payload:data})

    }catch(error){
        console.log("Error",error);

    }
}

export const acceptInvitation = ({invitationToken,navigate})=>async(dispatch)=>{
    dispatch({type:ACCEPT_INVITATION_REQUEST})
    try{
        const { data } = await api.get("api/projects/accept_invitation", {
            token: invitationToken
        });
        navigate(`/project/${data.projectId}`);
        console.log("invite accept",data);
        dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data})

    }catch(error){
        console.log("Error",error);

    }
}
