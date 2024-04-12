import Swal from "sweetalert2";

export const successAlert = (text: string) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: text,
  });
};

export const errorAlert = (text: string) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: text,
  });
};
