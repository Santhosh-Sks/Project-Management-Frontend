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
        const {data} = await api.get("api/projects/search?leyword="+keyword);
        console.log("Search projects",data);
        dispatch({type:SEARCH_PROJECT_SUCCESS,projects:data})

    }catch(error){
        console.log("Error",error);

    }
}

export const createProject= (projectData)=>async(dispatch)=>{
    dispatch({type:CREATE_PROJECT_REQUEST})
    try{
        const {data} = await api.post("api/projects",projectData);
        console.log("created projects",data);
        dispatch({type:CREATE_PROJECT_SUCCESS,projects:data})

    }catch(error){
        console.log("Error",error);

    }
}

export const fetchProjectById = (id)=>async(dispatch)=>{
    dispatch({type:FETCH_PROJECT_BY_ID_REQUEST})
    try{
        const {data} = await api.get("api/projects"+id);
        console.log("projects",data);
        dispatch({type:FETCH_PROJECT_BY_ID_SUCCESS,projects:data})

    }catch(error){
        console.log("Error",error);

    }
}

export const deleteProject = (id)=>async(dispatch)=>{
    dispatch({type:DELETE_PROJECT_REQUEST})
    try{
        const {data} = await api.delete("api/projects"+id);
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
        const {data} = await api.post("api/projects/accept_invitation",{
            params:{
                token:invitationToken
            }
        });
        navigate("project"+projectId)
        console.log("invite accept",data);
        dispatch({type:ACCEPT_INVITATION_SUCCESS,payload:data})

    }catch(error){
        console.log("Error",error);

    }
}
