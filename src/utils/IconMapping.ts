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
import { FaRegEdit, FaPaperPlane } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";

export const iconMapping: Record<string, IconType> = {
  email: FiMail,
  pass: FiEye,
  passhide: FiEyeOff,
  tel: FiPhone,
  user: FiUser,
  hash: FiHash,
  calendar: FiCalendar,
  edit: MdOutlineModeEdit,
  paperPlane: FaPaperPlane,
};