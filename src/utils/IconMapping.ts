import {
  FiMail,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiUser,
  FiHash,
  FiCalendar,
} from "react-icons/fi";
import { IconType } from "react-icons";

export const iconMapping: Record<string, IconType> = {
  email: FiMail,
  pass: FiEye,
  passhide: FiEyeOff,
  tel: FiPhone,
  user: FiUser,
  hash: FiHash,
  calendar: FiCalendar,
};
