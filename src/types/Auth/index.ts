export type AuthUser = {
  email?: string;
  password?: string;
  name?: string;
  password_confirmation?: string;
  cover?: string;
  cover_photo?: string;
  profile_picture?: string;
  user_name?: string;
  email_verified_at?: boolean;
  otp?: string;
  userId?: number;
};

export type PrivacySetting = {
  privacy_setting_id: number;
  privacy_setting_name: string;
  remarks: string;
  created_date: string;
};
