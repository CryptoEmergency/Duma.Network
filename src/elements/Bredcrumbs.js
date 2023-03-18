import {
	jsx,
	jsxFrag
} from '@betarost/cemserver/cem.js';

import svg from "@assets/svg/index.js";

const forExport = function ({ className, items }) {
	return (
		<div class="crumbs" style="z-index:2; position:relative;">
			<a
				href="/"
				onclick={(e) => {
					fn.siteLink(e);
				}}>
				<img alt="Home" src={svg["home"]} />
			</a>
			{items.map((item) => {
				return (
					<div style="display: flex;">
						<img class="arrow-path" alt="path" src={svg["arrowPath"]} />
						<span>{item}</span>
					</div>
				)
			})}

		</div>
	)
}

export default forExport