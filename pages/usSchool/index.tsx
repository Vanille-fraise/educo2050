import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Head from "next/head";

const LOGO_PATH = "logo-squared-white-bg.png";
const BG_PATH = "students-knowing-right-answer-small.jpg";

const UsSchoolPage: React.FC = () => {
  return (
    <>
      <MainLayout pageColor="white">
        <div
          className="flex flex-2"
          style={{
            backgroundImage: "url(" + BG_PATH + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-1"></div>
          <div className="flex flex-1 flex-col">
            <div
              className="flex-grow"
              style={{ backgroundColor: "transparent" }}
            ></div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="w-1/3">
                  <img className="max-w-full" src={LOGO_PATH} alt="Logo"></img>
                </div>
                <div
                  className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent"
                  style={{ width: "fit-content" }}
                >
                  EDU'CO 2050
                </div>
              </div>
              <div
                className="flex-grow"
                style={{ backgroundColor: "transparent" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to top right,rgba(88, 148, 178, 0.88), #367696e0)",
          }}
        ></div>
      </MainLayout>
    </>
  );
};

export default UsSchoolPage;
