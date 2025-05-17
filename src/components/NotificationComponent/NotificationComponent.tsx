/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 17/05/2025 10:20:14
*/
import React, { FC, useEffect } from "react";
import "./NotificationComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../redux/selectors/selectors";
import { REMOVE } from "../../redux/type/actions";
import { Notification } from "../../models/Notification";

interface NotificationComponentProps {}

const NotificationComponent: FC<NotificationComponentProps> = () => {
  const notifications = useSelector(getNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      notifications.map((notification: Notification) => {
        setTimeout(() => {
          dispatch({
            type: REMOVE,
            payload: notification,
          });
        }, notification?.timeout || 2000);
      });
    };
    runLocalData();
  });

  const handleDelete = (notification: Notification) => {
    dispatch({
      type: REMOVE,
      payload: notification,
    });
  };

  return (
    <div className="NotificationComponent">
      {notifications.map((notification: Notification) => (
        <div
          className={`alert alert-${notification.status} alert-dismissible fade show`}
          role="alert"
        >
          {notification.message}
          <button
            type="button"
            onClick={() => handleDelete(notification)}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
