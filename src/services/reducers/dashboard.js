import {
    dashboard
} from '../actionTypes';
import { isEmpty } from '../function';
export const dashboardState = {
    feaching: false,
    firstName: {
        value: localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "",
        containErrors: false,
    },
    lastName: {
        value: localStorage.getItem("lastName") ? localStorage.getItem("lastName") : "",
        containErrors: false,
    },
    gender: {
        value: localStorage.getItem("gender") ? localStorage.getItem("gender") : "",
        containErrors: false,
    },
    universityId: {
        value: localStorage.getItem("universityId") ? localStorage.getItem("universityId") : "",
        containErrors: false,
    },
    availabilities: {
        value: "",
        containErrors: false,
    },
    language: {
        value: "",
        containErrors: false,
    },
    study: {
        value: "",
        containErrors: false,
    },
    programTime: {
        value: "",
        containErrors: false,
    },
    comment: {
        value: "",
        containErrors: false,
    },
    teacherLanguageRequest: {
        requestId: "",
        teacherName: "",
        teacherId: "",
        languageListId: [],
        containErrors: false,
    },
    userInof: {
        role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
        activated: localStorage.getItem("activated") ? localStorage.getItem("activated") : "not_active",
        profile_status: localStorage.getItem("profileStatus") ? localStorage.getItem("profileStatus") : "not_completed",
        isUserLogin: localStorage.getItem("isUserLogin"),
        email: localStorage.getItem("userEmail") ? localStorage.getItem("userEmail") : "",
        uId: localStorage.getItem("uId") ? localStorage.getItem("uId") : "",

    },
    userIsLogged: {
        isLoggend: localStorage.getItem("isUserLogin") ? localStorage.getItem("isUserLogin") : false,
    },
    userUpdateProfile: {
        token: "",
        success: false,
        show: false,
        message: ""
    },
    updateRequestProgramResponse: {
        success: false,
        show: false,
        message: ""
    },
    updateResponselanguagesListForm: {
        success: false,
        show: false,
        message: ""
    },
    users: [],
    requestProgramList: [],
    languagesList: [],
    studyList: [],
    programListTeacher: [],
}
export const dashboardReducer = (state = dashboardState, action) => {
    switch (action.type) {
        case dashboard.UPDATE_FEACHING:
            return {
                ...state,
                feaching: action.payload.feaching,
            };
        case dashboard.UPDATE_VALID_FIRST_NAME_VALUE:
            return {
                ...state,
                firstName: {
                    ...state.firstName,
                    value: action.payload.firstName.value,
                }
            };

        case dashboard.UPDATE_FIRST_NAME_ERROR_FIELD:
            return {
                ...state,
                firstName: {
                    ...state.firstName,
                    containErrors: action.payload.firstName.containErrors,
                }
            };

        case dashboard.UPDATE_VALID_LAST_NAME_VALUE:
            return {
                ...state,
                lastName: {
                    ...state.lastName,
                    value: action.payload.lastName.value,
                }
            };

        case dashboard.UPDATE_LAST_NAME_ERROR_FIELD:
            return {
                ...state,
                lastName: {
                    ...state.lastName,
                    containErrors: action.payload.lastName.containErrors,
                }
            };

        case dashboard.UPDATE_VALID_USER_GENDER:
            return {
                ...state,
                gender: {
                    ...state.gender,
                    value: action.payload.gender.value,
                }
            };

        case dashboard.UPDATE_USER_GENDER_ERROR_FIELD:
            return {
                ...state,
                gender: {
                    ...state.gender,
                    containErrors: action.payload.gender.containErrors,
                }
            };
        case dashboard.UPDATE_VALID_UNIVERSITY_ID_VALUE:
            return {
                ...state,
                universityId: {
                    ...state.universityId,
                    value: action.payload.universityId.value,
                }
            };

        case dashboard.UPDATE_UNIVERSITY_ID_ERROR_FIELD:
            return {
                ...state,
                universityId: {
                    ...state.universityId,
                    containErrors: action.payload.universityId.containErrors,
                }
            };

        case dashboard.GET_USER_INFO_RESPONSE:
            localStorage.setItem("token", action.payload.response.token);
            localStorage.setItem("uId", action.payload.response.id);
            localStorage.setItem("role", action.payload.response.role);
            localStorage.setItem("userEmail", action.payload.response.email);
            localStorage.setItem("activated", action.payload.response.activated);
            localStorage.setItem("profileStatus", action.payload.response.profile_status);
            localStorage.setItem("firstName", action.payload.response.first_name ? action.payload.response.first_name : "");
            localStorage.setItem("lastName", action.payload.response.last_name ? action.payload.response.last_name : "");
            localStorage.setItem("gender", action.payload.response.gender ? action.payload.response.gender : "");
            localStorage.setItem("universityId", action.payload.response.university_id ? action.payload.response.university_id : "");
            localStorage.setItem("isUserLogin", true);

            return {
                ...state,
                userInof: {
                    ...action.payload.response,
                },
                userIsLogged: {
                    ...state.userIsLogged,
                    isLoggend: true,
                },
                firstName: {
                    ...state.firstName,
                    value: action.payload.response.first_name ? action.payload.response.first_name : "",
                },
                lastName: {
                    ...state.lastName,
                    value: action.payload.response.last_name ? action.payload.response.last_name : "",
                },
                gender: {
                    ...state.gender,
                    value: action.payload.response.gender ? action.payload.response.gender : "",
                },
                universityId: {
                    ...state.universityId,
                    value: action.payload.response.university_id ? action.payload.response.university_id : "",
                },
            };
        case dashboard.GET_UPDATE_PROFILE_RESPONSE:
            return {
                ...state,
                userUpdateProfile: {
                    ...state.userUpdateProfile,
                    success: action.payload.response.success,
                    message: action.payload.response.message,
                    activated: action.payload.response.activated ? action.payload.response.activated : "",
                    profileStatus: action.payload.response.profileStatus ? action.payload.response.profileStatus : "",
                    show: true,
                },
            };
        case dashboard.GET_USER_LIST_DATA_RESPONSE:
            return {
                ...state,
                users: action.payload.users
            };
        case dashboard.GET_USER_ACTIVE_RESPONSE:
            {
                let newUsers = state.users.map((user) => {
                    if (user.id === action.payload.id) {
                        user.is_active = "activated";
                    }
                    return user
                });
                return {
                    ...state,
                    users: newUsers,
                };
            }
        case dashboard.DELETE_USER_RESPONSE_BY_ID:
            {
                let newUsers = state.users.filter((user) => user.id !== action.payload.id);
                return {
                    ...state,
                    users: newUsers,
                };
            }
        case dashboard.GET_LANGUAGES_LIST_DATA_RESPONSE:
            {

                return {
                    ...state,
                    languagesList: action.payload.languages,
                };
            }
        case dashboard.UPDATE_VALID_AVAILABILITIES_VALUE:
            return {
                ...state,
                availabilities: {
                    ...state.availabilities,
                    value: action.payload.availabilities.value,
                }
            };
        case dashboard.UPDATE_AVAILABILITIES_ERROR_FIELD:
            return {
                ...state,
                availabilities: {
                    ...state.availabilities,
                    containErrors: action.payload.availabilities.containErrors,
                }
            };
        case dashboard.UPDATE_VALID_LANGUAGE_VALUE:
            return {
                ...state,
                language: {
                    ...state.language,
                    value: action.payload.language.value,
                }
            };

        case dashboard.UPDATE_VALID_STUDY_VALUE:
            return {
                ...state,
                study: {
                    ...state.study,
                    value: action.payload.study.value,
                }
            };

        case dashboard.UPDATE_STUDY_ERROR_FIELD:
            return {
                ...state,
                study: {
                    ...state.study,
                    containErrors: action.payload.study.containErrors,
                }
            };

        case dashboard.UPDATE_LANGUAGE_ERROR_FIELD:
            return {
                ...state,
                language: {
                    ...state.language,
                    containErrors: action.payload.language.containErrors,
                }
            };
        case dashboard.UPDATE_VALID_COMMENT_VALUE:
            return {
                ...state,
                comment: {
                    ...state.comment,
                    value: action.payload.comment.value,
                }
            };
        case dashboard.UPDATE_COMMENT_ERROR_FIELD:
            return {
                ...state,
                comment: {
                    ...state.comment,
                    containErrors: action.payload.comment.containErrors,
                }
            };
        case dashboard.UPDATE_VALID_PROGRAM_TIME_VALUE:
            return {
                ...state,
                programTime: {
                    ...state.programTime,
                    value: action.payload.programTime.value,
                }
            };
        case dashboard.UPDATE_PROGRAM_TIME_ERROR_FIELD:
            return {
                ...state,
                programTime: {
                    ...state.programTime,
                    containErrors: action.payload.programTime.containErrors,
                }
            };
        case dashboard.GET_PROGRAM_REQUEST_DATA_RESPONSE:
            return {
                ...state,
                updateRequestProgramResponse: {
                    ...state.updateRequestProgramResponse,
                    success: action.payload.response.success,
                    message: action.payload.response.message,
                    show: action.payload.response.show,

                }
            };

        case dashboard.UPDATE_REQUEST_PROGRAM_LIST_RESPONSE:
            {

                return {
                    ...state,
                    requestProgramList: action.payload.programRequest,
                };
            }


        case dashboard.UPDATE_TEACHER_LANGUAGE_REQUEST_RESPONSE:
            let fullName = state.firstName.value + " " + state.lastName.value;
            return {
                ...state,
                teacherLanguageRequest: {
                    ...state.teacherLanguageRequest,
                    requestId: action.payload.response.requestId,
                    teacherName: !isEmpty(action.payload.response.teacherName) ? action.payload.response.teacherName : fullName,
                    teacherId: !isEmpty(action.payload.response.teacherId) ? action.payload.response.teacherId : state.universityId.value,
                    languageListId: !isEmpty(action.payload.response.languageListId) ? action.payload.response.languageListId.split(",") : [],
                }
            };

        case dashboard.UPDATE_LANGUAGE_LIST_ID:
            let newLanguageList = state.teacherLanguageRequest.languageListId
            if (newLanguageList.includes(action.payload.languageID.value.toString())) {
                newLanguageList = newLanguageList.filter(item => item != action.payload.languageID.value)
            } else {
                newLanguageList.push(action.payload.languageID.value)
            }
            return {
                ...state,
                teacherLanguageRequest: {
                    ...state.teacherLanguageRequest,
                    languageListId: newLanguageList,
                }
            };

        case dashboard.UPDATE_LANGUAGE_LIST_ID_ERROR_FIELD:
            return {
                ...state,
                teacherLanguageRequest: {
                    ...state.teacherLanguageRequest,
                    containErrors: action.payload.teacherLanguageRequest.containErrors,
                }
            };
        case dashboard.UPDATE_TEACHER_LANGUAGE_REQUEST_FORM_RESPONSE:
            return {
                ...state,
                updateResponselanguagesListForm: {
                    ...state.updateResponselanguagesListForm,
                    success: action.payload.response.success,
                    message: action.payload.response.message,
                    show: action.payload.response.show,

                }
            };


        case dashboard.UPDATE_TEACHER_PROGRAM_RESPONSE:
            {
                return {
                    ...state,
                    programListTeacher: action.payload.response,
                };
            }
        case dashboard.UPDATE_PROGRAM_STATUS_BY_ID:
            {
                let newProgramListTeacher = state.programListTeacher.map((program) => {
                    if (program.id === action.payload.id) {
                        program.request_status = action.payload.status;
                        program.teacher_name = state.firstName.value + " " + state.lastName.value;

                    }
                    return program
                });
                return {
                    ...state,
                    programListTeacher: newProgramListTeacher,
                };
            }
        case dashboard.GET_STUDY_LIST_DATA_RESPONSE:
            {
                return {
                    ...state,
                    studyList: action.payload.Studys,
                };
            }

        default:
            return state;
    }
};