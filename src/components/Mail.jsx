import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const MailService = ({ isPopupOpen, onClose }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_email: "",
    from_name: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_MAILJS_SERVICE_ID,
        process.env.REACT_APP_MAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.REACT_APP_MAILJS_PUBLIC_KEY,
        },
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "메일이 성공적으로 전송되었습니다!",
            showConfirmButton: false,
            timer: 3000,
            position: "top-right",
            toast: true,
            timerProgressBar: true,
          });
          setFormData({ from_email: "", from_name: "", message: "" });
          onClose();
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: `메일 전송에 실패했습니다. 오류: ${error.message}`,
            showConfirmButton: false,
            timer: 3000,
            position: "top-right",
            toast: true,
            timerProgressBar: true,
          });
        },
      );
  };

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="font-title text-lg-title text-center text-fontBlack mb-4">
          문의 사항
        </h2>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-2">
            <label className="font-title block text-content text-fontBlack mb-1">
              Email
            </label>
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-fontBlack rounded focus:outline-none focus:ring-2 focus:ring-highlightBlue"
              placeholder="이메일을 입력해 주세요..."
              required
            />
          </div>
          <div className="mb-2">
            <label className="font-title block text-content text-fontBlack mb-2">
              Name
            </label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-fontBlack rounded focus:outline-none focus:ring-2 focus:ring-highlightBlue"
              placeholder="성함을 입력해 주세요..."
              required
            />
          </div>
          <div className="mb-2">
            <label className="font-title block text-content text-fontBlack mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-56 p-2 border border-gray-300 text-fontBlack rounded resize-none focus:outline-none focus:ring-2 focus:ring-highlightBlue"
              rows="4"
              placeholder="문의사항을 입력해 주세요..."
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="font-title bg-highlightBlue text-white text-comment p-2 rounded"
            >
              보내기
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ from_email: "", from_name: "", message: "" });
                onClose();
              }}
              className="font-title ml-4 bg-gray-500 text-white text-comment p-2 rounded"
            >
              닫기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailService;
