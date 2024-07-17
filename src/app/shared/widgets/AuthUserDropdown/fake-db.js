import {ASSET_AVATARS} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import avatar from "../../../../core/assets/images/img-avatar.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const authUser = {
    email: "admin@olympus.pe",
    // name: "Administrator",
    // profile_pic: getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, `60x60`),
    profile_pic: getAssetPath(`${AccountCircleIcon}`, `60x60`),
    handle: " Admin ",
    job_title: "Creative Head"
};
