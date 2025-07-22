import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from '@/components/ui/Button';
import GlobalTopNav from '@/components/ui/Nav/GlobalTopNav';
import { getFieldConfig, fieldConfigMap, type FieldKey } from "@/pages/mypage/constants/fieldConfig";
import StyledToast from "@/components/ui/Toast/StyledToast";

const EditFieldPage: React.FC = () => {
  const { field } = useParams<{ field: FieldKey }>();
  const navigate = useNavigate();

  // field 유효성 검사 (guard)
  const config =
    field && field in fieldConfigMap ? getFieldConfig(field) : undefined;
  if (!config) {
    navigate("/mypage", { replace: true });
    return null;
  }

  const { label, placeholder, helperText, defaultValue = "", onSubmit } = config;
  const [value, setValue] = useState(defaultValue);
  const [toastVisible, setToastVisible] = useState(false);

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    onSubmit(value);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
      navigate("/edit", {
        state: { updatedField: field, updatedValue: value },
      });
    }, 1500);
  };

  return (
    <>
      {/* 토스트 */}
      {toastVisible && (
        <StyledToast
          id="toast-1"
          message={`${label}이(가) 변경되었습니다!`}
          onClose={() => setToastVisible(false)}
        />
      )}

      {/* 메인 레이아웃 */}
      <div className="w-[360px] h-[744px] flex flex-col justify-between bg-white mx-auto">
        <div>  
          <div className="w-[360px] h-[44px] flex justify-between opacity-100 rotate-0 pt-[10px] pr-[20px] pb-[10px] pl-[20px]">
              <GlobalTopNav message="마이페이지" showCancel={false} />
            </div>
          <div className="px-5 mt-5 space-y-3">
            <h2 className="text-base font-bold">{label}을 입력해주세요</h2>

            {/* 입력창 */}
            <div className="border rounded-lg p-4 shadow-sm bg-white">
              <label className="block text-sm font-semibold mb-1">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border-none outline-none placeholder-gray-400"
              />
            </div>

            {/* 안내 문구 */}
            {helperText && (
              <p className="text-xs text-gray-500">{helperText}</p>
            )}
          </div>

        {/* 하단 버튼 */}
        <Button size='large' variant='primary' fullWidth onClick={handleSubmit}>
          확인
        </Button>
        </div>
      </div>
    </>
  );
};

export default EditFieldPage;
