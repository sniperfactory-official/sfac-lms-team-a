"use client";
import React, { useState, useRef } from "react";
import ModalWrapper from "@/components/ModalWrapper";
import Image from "next/image";

const ModalExamplePage = () => {
  return (
    <>
      <DropdownModalTest />
      <ModalInModalTest />
    </>
  );
};

export default ModalExamplePage;

const TestModalTitle = () => {
  return <div>테스트 {">"} 테스트트 </div>;
};

const DropdownModalTest = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isShowSelectDropdown, setIsShowSelectDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onModalCloseAndOpen = () => {
    setIsOpenModal(!isOpenModal);
  };
  const onBlurOutsideDropdown = (e: any) => {
    const clickedElement = e.relatedTarget;
    if (isShowSelectDropdown && dropdownRef.current !== clickedElement)
      setIsShowSelectDropdown(false);
  };
  const getTargetValue = (val: string) => {
    alert("value는 : " + val);
    if (isShowSelectDropdown) setIsShowSelectDropdown(!isShowSelectDropdown);
  };

  return (
    <div className="text-center">
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
        onClick={onModalCloseAndOpen}
      >
        드롭다운예제
      </button>

      {isOpenModal && (
        <ModalWrapper
          modalTitle={<TestModalTitle />}
          onCloseModal={onModalCloseAndOpen}
        >
          <div className="w-64">
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => {
                  setIsShowSelectDropdown(!isShowSelectDropdown);
                }}
                onBlur={e => onBlurOutsideDropdown(e)}
                className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 foconClick={handleDoubleModal}us:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <span className="flex items-center">
                  <span className="block ml-3 truncate">Brand</span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              {isShowSelectDropdown && (
                <div
                  tabIndex={1}
                  ref={dropdownRef}
                  className="absolute w-full mt-1 bg-white rounded-md shadow-lg"
                >
                  <ul className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <li
                      onClick={() => getTargetValue("Nike")}
                      id="listbox-item-0"
                      className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                    >
                      <div className="flex items-center">
                        <span className="block ml-3 font-normal truncate">
                          Nike
                        </span>
                      </div>
                    </li>
                    <li
                      id="listbox-item-1"
                      className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                      onClick={() => getTargetValue("Adidas")}
                    >
                      <div className="flex items-center">
                        <span className="block ml-3 font-normal truncate">
                          Adidas
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

const ModalInModalTest = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSecondOpenModal, setIsSecondOpenModal] = useState(false);
  const onModalCloseAndOpen = () => {
    setIsOpenModal(!isOpenModal);
  };
  const onSecondModalCloseAndOpen = () => {
    setIsSecondOpenModal(!isSecondOpenModal);
  };

  return (
    <div className="text-center mt-5">
      <button
        onClick={onModalCloseAndOpen}
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
      >
        중복모달예제
      </button>
      {isOpenModal && (
        <ModalWrapper onCloseModal={onModalCloseAndOpen}>
          <button
            onClick={onSecondModalCloseAndOpen}
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
          >
            중복모달예제
          </button>
          <div>이미지박스용</div>
          <div>중복모달예제</div>
          {isSecondOpenModal && (
            <ModalWrapper
              onCloseModal={onSecondModalCloseAndOpen}
              isWrapperNoPadding={true}
            >
              <div className="h-[500px]">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAC2CAMAAADAz+kkAAABI1BMVEUzMzNW3f3///9X4P9X4v8zNDMzNDUxIx9W5P8xMTExIxZKq8FEiJhFjaIyKSFLtswxKiVS0+0yHBcxMzdLscg2Pz8qKioiIiLp6ekyJiUtLS0XFxdSy+QfHx8+coAaGho3Y2k5VV41LS07Ym1jY2Pw8PB7e3tY2v6xsbE0HhPBwcHZ2dkuNTQ0MS4zNCpMTEyfn5+IiIg4MTelpaU7OzsrKRkyJh06KiwuNjIyIywzZ3g9dn4wKSxV6P9MobQwKjgqNjsvQ0U3WWY0R05JlZ5LqLQoHxVMmrFY2+9KhpwtMTwnPkEyHgxEkZRZqcc1V2pXzN0wUlRQut04Gx5/f380Aw0AAABnZ2dWVlY4GB9Nv85CfogxVl1Dd4xDZ34yGyc1EQl4svdqAAAIIklEQVR4nO2aC1viSBaGE5JKUsSGxEJiEESCGkUqasaGeEnaS9sivbPTTveMro4z+/9/xVYVF0Ho6Z6e3SW05318sAgJVD6+c+pUUZIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8/sORpJCQSaaJZdyVNNKNc9nWrHdFZdyRNoPDwKDGT+mHkzborKQK5q7EqK8bxYXPWXUkRgWsrsiyr5RzklSfIkiyIT2bdkzSBJZl7RZEhrYyAWkmsyEqc6BBBT2jSm6Rsl5PTZjjrrqQI1KQWOWvqNIQx6AkNEwmHmJCIauwZgx1EvCWJB230ZMSeotGn421+8dzHIS6yhyiMPEqp52HajULWogElYRS0XavdtijVUOBpWkgtS9d116OaNrxvxFrUyrHj7SAIm+Jii/JILJZmeFt/i9LK7h6Tpdmunddqtd9uKCL0grVq5xde1Hqz+vby8vLt6ptcwGoaqnePrkzTvDpeytKBLAgRyT19SEwzWTi3aNQ8FxeHSCrura8UZ3t33wLGRWe9kdlYYW23YCgMM6cRfYE15dh8F151WLmryKrauX4TIq971VFVVVFUVU7e54YJqPX+smP4/LBRPvrHWszOMH50kVRdzuxsFh08wzv8BrCD93cymcwyU0XL5lVer5gtJFkLrKkq//zJZoowSZgIclwI3doHgz9RmUyy6t+0JT50Ia31O79QVcR56tUjLwaNV7okrSzzN987qMxPIGFckfZ4t4eq8LtRTb2viiKXO0ITRdS8rJK56Piyz+iVe0r5kJnAIzhXN3plsc/swucMhlAlp/VUyWQ2GnfzEkhFZ7eR6TOiijJURe3dvqoIVfiDzW2jqIbSnxssWHz9oV2zVUMVihrsvy/zvzFVGDubjjPrO/4iLJ3cDjX5jFd8xZAV/2fTzNsGt4bss7uWy2ZilplGiuqrNlMlDA7zXDcWVHYhMX/2FZWf+1wVZpjUB5JTFOlkSKMyxSvcGOZSVtffEVPYw2cqPZQWT7bf1W05ZoZQ6h4hwbmIn4569X5bz23XCiztDrzibGXGPibFgVRi6WRjpK8bW3f8O5zwCssnySGlrOiNPt4LlWRj9aMVEIm26waPEnXB0gJdJGmmwnY7wITmDhOec3uqSI40Lv/OZjWVJQyu3o19gTufqg7mQ+ekVwy/6YUESZhkj/hzX83rhBCNoCgsCwWvLIqXFOGVD79EkcRKHUJP7EFe0XiorhzsLY9+B3u7ldSN1KX10e9ueW+3OvD0hFdYotju1Wkavuhl3GNXHNAktz+K6yR3LHNV4npAemU+csvy0Csc7FTWt0bNubWbNllGI71xW+zZRDA5Bsn2Yu8lhJdsMeqsDdZedFMMzgWdtN4qXCC7Gw3e57kqjJKDN0eS+6e0ZZehKjv7xfEhYUq98qTK6XNVCmpflcWelveHqF//T1OF1UalKsvwfcdsplWVxu6vRWnMyBNeeVJFmuKVoSq9DHPpSn2zTFWFwWT5tJxyVbhZnDGz/KlXJlQpDCJou6yIMl/kVvE+E6pgCZecX28bw9ySOlWKe6P1w23JeZ5X/roqMldlITd8n0mvsDL6h9F0e5u6wbm4PpL2Mss/3A0GoT+JoK9Q5ZU+0OC5KqXKwVjNsrG1mzarSLyXu+MFy36lMrWKm1BF8etW/01GVTFE5ZLt9l03qgrGzsrozIJ9DfuakzqnCLDj7I8WVpnGOpbQl72iylNUyfZHoyzpvzSmynjksA+qFtNWq4zgVD6Nuboq4S97RVWOpqiSiOl02fKmjEErY1Xt1m41nTZ5QqzBDX298jVeUdTVSVVeH8vCLDdtwgvbMCTtsjJFleX9g7lYk2NpcFCIf2bV6Xm2NaaoEpyKaVCcLAqvoCg4/DDplcZ6Jc2hMwZ2cG/mNnXV6etUof+6782R1nR2nFD68Uf1mVfmIXTGwE5xc+dveUV6fRTzpmKvLVpeKessiEWGJ1VY6FTwvPhkAC5W7hrL1a/JK9MjKGzx7OozXfIPq4+vyqrIvgNVdm6duQmdcViCeRqZ/3Je6bbXDLm3thsbxmBNtz8yH8xX6IwzddVpcnY4Na9o1H0whD/ESrYshqRBbTvHmvQg2bzSU0XTXLG+og5U0QaqHI+owlewC4tdjJpS+9HgGVbx+VWx2a9XrO/hV/zwJM8jIDZ1QtwF1lRiW++9pHkXtsFfOx7Mg9x8zM6IC68R33FJW7/llVgs38X29R/9esWKPvdRc0Tk3dQ5vd+ZWWOtft7fZIoiaU28tjT4wR3f1PmRmkf4/oUusry1pJAv583Hg2yr7xV37nclMGjYtPieBIpoGPDdCbSN+/NgikJq8e0KaHij9ISfjKWAF7Q0JBK19JP2yWIOIUvkFfXa+x5U+Ub4rZ/ceBKREINqJPd7zH8eMGovezczpqf29aKFu6xNMHXv+Titdua0TPlvERXvDSM5zVKMcdAqJmw4YqNR0n7J++sIDS55yNjXtaWlpbPHssHGZ8PvnHnaly/+fsE1PvHpqIbh23Z/v4JvLLiz7tdMicLobWzwfS1MF6PTK23jRJ91v2YL6qI/HsTmL2ES/qcqyb9fclLhsKHZOksGm39kJk/+/IU7RaARyz17KPh8TmDnk/P2y65UBmiEtF29peuLH3VdpwF50cNPH0SRFiHMa1ukaRpoAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D/nP4694QBhzE3EAAAAAElFTkSuQmCC"
                  alt="test"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </ModalWrapper>
          )}
        </ModalWrapper>
      )}
    </div>
  );
};
