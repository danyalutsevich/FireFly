import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Alert.css";

export function Alert({
  title,
  text = "Please, try again!",
  icon = "error",
  timer = 3000,
  timerProgressBar = true,
  showConfirmButton = false,
  showCancelButton = false,
}) {
  const MySwal = withReactContent(Swal);
  let caption;
  if (title == "auth/user-not-found") {
    caption = "User not found";
  } else if (title == "auth/wrong-password") {
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
    text = "Password should be at least 6 characters";
  } else if (title == "auth/email-already-in-use") {
    caption = "Email already in use";
  } else if (title == "auth/missing-email") {
    caption = "Missing Email";
  } else {
    caption = title;
  }
  return MySwal.fire({
    title: caption == undefined ? title : caption,
    text: text,
    icon: icon,
    timer: timer,
    background: "#272727",
    color: "white",
    timerProgressBar: timerProgressBar,
    showConfirmButton: showConfirmButton,
    showCancelButton: showCancelButton,
  });
}
