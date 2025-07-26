// src/pages/mypage/fieldConfig.ts
export type FieldKey = 'nickname' | 'name' | 'gender' | 'birthDate';

export interface FieldConfig {
  label: string;
  placeholder: string;
  helperText?: string;
  defaultValue?: string;
  onSubmit: (value: string) => void;
}

const configArr: Array<{
  key: FieldKey;
  label: string;
  placeholder: string;
  helperText?: string;
}> = [
  {
    key: 'nickname',
    label: '닉네임',
    placeholder: '텍스트를 입력해 주세요',
    helperText: '메세지에 마침표를 찍어요',
  },
  {
    key: 'name',
    label: '이름',
    placeholder: '이름을 입력해 주세요',
    helperText: '메세지에 마침표를 찍어요',
  },
  {
    key: 'gender',
    label: '성별',
    placeholder: '성별을 입력해 주세요',
    helperText: '메세지에 마침표를 찍어요',
  },
  {
    key: 'birthDate',
    label: '생년월일',
    placeholder: 'YYYY.MM.DD',
    helperText: '메세지에 마침표를 찍어요',
  },
];

export const fieldConfigMap: Record<FieldKey, FieldConfig> = Object.fromEntries(
  configArr.map(({ key, label, placeholder, helperText }) => [
    key,
    {
      label,
      placeholder,
      helperText,
      defaultValue: '',
      onSubmit: (v: string) => {
        console.log(`${label} 저장:`, v);
      },
    },
  ]),
) as Record<FieldKey, FieldConfig>;

export function getFieldConfig(key: FieldKey): FieldConfig {
  return fieldConfigMap[key];
}
