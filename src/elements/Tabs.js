import {
	jsx,
	jsxFrag,
	initReload,
	Data
} from '@betarost/cemserver/cem.js';

import svg from "@assets/svg/index.js";

const forExport = function ({ className, children, varName, items }) {
	return (
		<div class="tabs">
			<div class="circle-effect circle-effect1"></div>
			<div class="circle-effect circle-effect2"></div>
			<div
				class="tabs-controller"
				style="z-index:5; position:relative; display:flex;"
			>
				<div class="glider"></div>
				{
					items.map((item, index) => {
						return (
							<section>
								<input
									// id={`tab-${varName + index}`}
									id={`tab-${index + 1}`}
									type="radio"
									class={[Data.Static[varName] == item.name ? "checked-input" : null]}
									name="tab"
								/>
								<label
									// for={`tab-${varName + index}`}
									for={`tab-${index + 1}`}
									class={[Data.Static[varName] == item.name ? "checked-label" : null]}
									style="z-index:5; position:relative;"
									onclick={() => {
										Data.Static[varName] = item.name;
										initReload();
									}}
								>
									{item.title}
								</label>
							</section>
						)
					})
				}
			</div>
			{children}
		</div>
	)
}

export default forExport