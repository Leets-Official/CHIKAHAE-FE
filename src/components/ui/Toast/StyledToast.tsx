// src/components/ui/Toast/StyledToast.tsx
import React from "react";
import clsx from "clsx";
import Toast from "@/components/ui/Toast/Toast";

type ToastProps = React.ComponentProps<typeof Toast>;
type StyledToastProps = Omit<
  ToastProps,
  "containerClassName" | "messageClassName" | "actionClassName"
> & {
  textClassName?: string;
  actionClassName?: string;
  containerClassName?: string;
};

const StyledToast: React.FC<StyledToastProps> = ({
  textClassName,
  actionClassName,
  containerClassName,
  ...rest
}) => (
  <Toast
    {...rest}
    containerClassName={clsx(
      // 위치
      "absolute top-[13px] left-[99px]",
      // 크기
      "w-[162px] h-[42px]",
      // 회전·투명도
      "rotate-0 opacity-100",
      // 모서리·패딩
      "rounded-[30px] pt-[14px] pr-[18px] pb-[14px] pl-[18px]",
      // 자식 간격·플렉스
      "gap-[10px] flex items-center justify-between",
      // 추가 override
      containerClassName
    )}
    messageClassName={textClassName}
    actionClassName={actionClassName}
  />
);

export default StyledToast;
