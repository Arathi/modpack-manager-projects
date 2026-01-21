import type { HTMLAttributes } from "react";
import { LuBox, LuBoxes, LuSettings } from "react-icons/lu";
import { NavLink } from "react-router";

type Props = HTMLAttributes<HTMLDivElement> & {};

const NavigatorBar: React.FC<Props> = ({ ...props }) => {
  return (
    <div {...props}>
      <NavLink className="nav-link" to="/mods">
        <LuBox />
        <span>模组</span>
      </NavLink>
      <NavLink className="nav-link" to="/modpacks">
        <LuBoxes />
        <span>整合包</span>
      </NavLink>
      <NavLink className="nav-link" to="/settings">
        <LuSettings />
        <span>设置</span>
      </NavLink>
    </div>
  );
};

export default NavigatorBar;
