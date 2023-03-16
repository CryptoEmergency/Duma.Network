import {
	jsx,
	jsxFrag,
	Variable,
	initReload,
} from '@betarost/cemserver/cem.js';

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ Static, onclick, className }) {
	return (
		<div>
			<div class="circle-effect circle-effect1"></div>
			<div class="circle-effect circle-effect2"></div>
			<div class="personal-header">
				<div class="user">
					<div class="user-card">
						<img src={images["personal/user"]}></img>
						<div class="user-name">
							<span class="user-name_wel">Welcome</span>
							<span class="user-name_name">
								{Variable.myInfo.firstName}
							</span>
						</div>
					</div>
					<span class="upgrade"
						onclick={() => {
							fn.modals.Soon({});
						}}>upgrade</span>
				</div>
				{/* <div class="header-btns">
                          <button class="btn btn-passive">ПОПОЛНИТЬ</button>
                          <button class="btn btn-bordo btn-passive">ВЫВЕСТИ</button>
                        </div> */}
			</div>
		</div>
	)
}

export default forExport
