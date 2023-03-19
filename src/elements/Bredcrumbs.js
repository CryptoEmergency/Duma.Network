import {
	jsx,
	jsxFrag
} from '@betarost/cemserver/cem.js';

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";

const forExport = function ({ className, items }) {
	return (
		<div class="crumbs" style="z-index:3; position:relative;">
			<a
				href="/"
				onclick={(e) => {
					fn.siteLink(e);
				}}>
				<img alt="Home" src={svg["home"]} />
			</a>
			{items.map((item) => {
				return (
					<div style="display: flex; align-items: center;">
						<img class="arrow-path" alt="path" src={svg["arrowPath"]} />
						<a
							style="text-decoration: none; color: white;"
							href={item.link}
							onclick={(e) => {
								fn.siteLink(e);
							}}>
							<span>{item.title}</span>
						</a>
					</div>
				)
			})}

		</div>
	)
}

export default forExport