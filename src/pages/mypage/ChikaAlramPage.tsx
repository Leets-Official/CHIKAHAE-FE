import PageHeader from "@/components/ui/MypageHeader/PageHeader";
import ChikaAlram from "@/pages/mypage/components/ChikaAlram";

const ChikaAlramPage = () => {
    return (
      <div className="w-[360px] max-w-[430px] h-[745px] flex flex-col gap-6 bg-white mx-auto opacity-100">
            <PageHeader message="양치 알림" />

        <div className="w-[320px] h-[188px] opacity-100 rounded-[8px] mx-auto">
            <ChikaAlram /> 
        </div>
      </div>      
 );
};


export default ChikaAlramPage;