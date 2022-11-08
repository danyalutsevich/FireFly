import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import AlertCSS from "./Alert.module.scss";

export function Alert(
  title,
  icon = "error",
  timer = "1000",
  timerProgressBar = true,
  showConfirmButton = false,
  text = "Please, try again!"
) {
  const MySwal = withReactContent(Swal);
  let caption;
  if (title === "auth/user-not-found") {
    caption = "User not found";
  } else if (title === "auth/wrong-password") {
    caption = "Wrong Password";
  } else if (title == "auth/invalid-email") {
    caption = "Invalid Email";
  } else if (title == "auth/internal-error") {
    caption = "Internal Error";
  } else if (title == "auth/too-many-requests") {
    caption = "Too many requests";
  } else if (title == "auth/user-disabled") {
    caption = "User Disabled";
  } else if (title == "auth/operation-not-allowed") {
    caption = "Operation not allowed";
  } else if (title == "auth/invalid-argument") {
    caption = "Invalid Argument";
  } else if (title == "auth/weak-password") {
    caption = "Weak Password";
  } else if (title == "auth/email-already-in-use") {
    caption = "Email already in use";
  } else {
    caption = title;
  }
  MySwal.fire({
    title: caption === undefined ? title : caption,
    text: text,
    icon: icon,
    timer: timer,
    background: "#272727",
    color: "white",
    timerProgressBar: timerProgressBar,
    showConfirmButton: showConfirmButton,
  });
}
}
