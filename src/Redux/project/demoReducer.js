import ProjectDetails from "@/pages/ProjectDetails/ProjectDetails";
import { searchProject } from "./Action";
import { ACCEPT_INVITATION_REQUEST, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, FETCH_PROJECT_BY_ID_REQUEST, FETCH_PROJECT_BY_ID_SUCCESS, FETCH_PROJECT_REQUEST, FETCH_PROJECT_SUCCESS, INVITE_TO_PROJECT_REQUEST, SEARCH_PROJECT_SUCCESS } from "./ActionType";

export const initialState ={
    projects:[],
    loading:false,
    error:null,
    ProjectDetails:null,
    searchProject:[]
};

export const projectReducer =(state = initialState,action)=>{
    switch(action.type){
        case FETCH_PROJECT_BY_ID_REQUEST:
        case CREATE_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case FETCH_PROJECT_REQUEST:
        case ACCEPT_INVITATION_REQUEST:
        case INVITE_TO_PROJECT_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            };
        case FETCH_PROJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                projects:action.payload,
                error:null,
            };
        case SEARCH_PROJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                projects:action.payload,
                error:null,
            };
        case CREATE_PROJECT_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    projects:[...state.projects,action.project],
                    error:null,
                };
        case FETCH_PROJECT_BY_ID_SUCCESS:
                    return{
                        ...state,
                        loading:false,
                        ProjectDetails:action.project,
                        error:null,
                    };
         case DELETE_PROJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                projects:state.projects.filter(project => project.id ===action.projectId),
                error:null,
            };
        
                
        

        default:
            state;
            }
};
 