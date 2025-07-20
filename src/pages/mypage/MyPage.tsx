import React, { useState } from "react";
import MyPageHeader from "@/components/ui/MypageHeader/MyPageHeader";
import ProfileSection from "./components/ProfileSection";
import MenuList from "./components/MenuList";
import type { MenuItem } from "./components/MenuList";
import ChikaButton from "../../components/ui/ChikaButton/ChikaButton";
import { BottomNav } from "@/components/ui/Nav/BottomNav";
import ProfileIcon from "@/assets/icons/my_profile.svg";
import ChikaBtnImg from "@/assets/icons/BrushingTeethNotiBtn.svg";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/ui/Modal/Modal";

type ModalType = "logout" | "withdraw" | null;

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType>(null);
  const closeModal = () => setModalType(null);

  const menuData: MenuItem[] = [
    { label: "공지사항", path: "/notice" },
    { label: "FAQ",      path: "/faq"    },
    { label: "이용약관",  path: "/tos"    },
    { label: "로그아웃",  path: "", onClick: () => setModalType("logout") },
    { label: "회원탈퇴",  path: "", onClick: () => setModalType("withdraw") },
  ];


  return (
  <>
    <div className="w-[360px] max-w-[430px] h-[745px] flex flex-col gap-6 bg-white mx-auto opacity-100">
        <MyPageHeader />

      <div className="w-[360px] h-[508px] flex flex-col gap-[32px] opacity-100">
        {/* 프로필 & 메뉴 리스트 */}
        <div className="w-[360px] h-[412px] flex flex-col gap-[32px] opacity-100">
        <ProfileSection
          imgSrc={ProfileIcon}
          nickName="이름"
          gender="성별"
          birthday="생년월일"
        />

        <MenuList items={menuData} />

          {/* 치카 버튼 */}
          <div className="flex justify-center">
              <ChikaButton
                imgSrc={ChikaBtnImg}
                onClick={() => navigate("/ChikaAlramPage")}
              />
          </div>
        </div>
    
          <div className="w-[360px] h-[86px] fixed bottom-0 left-1/2 -translate-x-1/2">
              <BottomNav /> 
          </div>
        </div>
      </div>

      {/* 포탈로 렌더링 되는 모달들 */}
      <Modal
        isOpen={modalType === "logout"}
        onClose={closeModal}
        title="로그아웃 하시겠어요?"
        footer={(
          <div className="flex gap-[8px]">
            <button
              onClick={closeModal}
              className="w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] border-[#CBD5DC] bg-[#E9EEF2] shadow-[0px_4px_0px_0px_#9CA6AF] text-sm font-semibold"
            >
              취소
            </button>
            <button
              onClick={() => navigate("/logout")}
              className="w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] bg-[#5FC6F0] shadow-[0px_4px_0px_0px_#3DAFD9] text-white text-sm font-semibold"
            >
              로그아웃
            </button>
          </div>
        )}
      >
        현재 계정에서 로그아웃됩니다.
      </Modal>

      <Modal
        isOpen={modalType === "withdraw"}
        onClose={closeModal}
        title="정말 탈퇴하시겠어요?"
        footer={(
          <div className="flex gap-[8px]">
            <button
              onClick={closeModal}
              className="w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] border-[#CBD5DC] shadow-[0px_4px_0px_0px_#9CA6AF] bg-[#E9EEF2] text-sm font-semibold"
            >
              취소
            </button>
            <button
              onClick={() => navigate("/logout")}
              className="w-[135px] h-[40px] pl-[12px] pr-[12px] rounded-[8px] bg-[#5FC6F0] shadow-[0px_4px_0px_0px_#3DAFD9] text-white text-sm font-semibold"
            >
              로그아웃
            </button>
          </div>
        )}
      >
        탈퇴 시 계정이 복구되지 않습니다.
      </Modal>
    </>
  );
};


export default MyPage;
