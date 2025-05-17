import { Notification } from "../../models/Notification";
import { ADD, CLEAR, NotificationAction, REMOVE } from "../type/actions";

const initState = {
  notifications: [],
};
const initAction = {
  type: null,
  payload: null,
};
export const storageReduders = (
  state = initState,
  action: NotificationAction = initAction
) => {
  switch (action.type) {
    case ADD:
      return {
        notifications: [...state.notifications, action.payload],
      };
      break;
    // ==============
    case REMOVE:
      // filtrer et garder toutes les notification dont l'id differe de l"id de la notification à supprimer
      state.notifications = state.notifications.filter(
        (notif: Notification) => notif._id !== action.payload?._id
      );
      return {
        notifications: [...state.notifications],
      };
      break;
    // ==============
    case CLEAR:
      return {
        ...initState,
      };
      break;
    // ==============
    default:
      return state;
      break;
  }
};
