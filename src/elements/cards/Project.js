import {
	jsx,
	jsxFrag
} from '@betarost/cemserver/cem.js';

import { fn } from "@src/functions/export.js";
import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const forExport = function ({ className, items = [] }) {
	return (
		<div class="cards">
			{items.map((item) => {
				return (
					<div class="card-item">
						<img class="card-item_img" src={images[`research/${item.galery[0]}`]} />
						<div class="info">
							<div class="info-bell">
								<img src={svg["iconsGreen/bell"]} class="bell"></img>
							</div>
							<div class="company">
								<img src={images[`research/${item.icon}`]}></img>
								<div class="company-title">
									<span>{item.name}</span>
								</div>
							</div>
							<div class="statuses">
								<div class="icon">
									<img src={svg.binance}></img>
								</div>
								<div class="status">{item.status}</div>
								<div class="ecosystem">{item.category}</div>
								<div class="circle">{item.rank ? item.rank : 0}</div>
								<div style="color:#E7C343;">{item.rank < 100 ? "low rank" : "medium rank"}</div>
							</div>
							<div class="desc">
								<span class="desc-title">{item.title}</span>
								<p class="desc-text">
									{item.description}
								</p>
							</div>
							<div class="socials">
								{item.social.map((element) => {
									return (
										<a target="_blank" href={element.link}>
											<img
												alt={element.name}
												src={svg[`iconsGreen/${element.name}`]}
												class="icon-green"
											></img>
										</a>
									);
								})}
							</div>
							<div class="desc">
								<span class="desc-title">SEED ROUND | {item.seedRound}$</span>
							</div>
							<div class="progressBlock">
								<div
									style={[
										`width: calc(100% * ${item.have / item.target})`,
									]}
									class="progressBlock-column"
								></div>
							</div>
							<span class="summ">{item.have}$/{item.target}$</span>
							<button class="btn btn-green">{!item.partners ? "RESEARCH ABOUT THE Project" : "Become a partners"}</button>
						</div>
					</div>
				)
			})}

			{/* <div class="card-item">
				<img class="card-item_img" src={images["card/1"]} />
				<div class="info">
					<div class="info-bell">
						<div class="circle">123</div>
						<img src={svg["iconsGreen/bell"]} class="bell"></img>
					</div>
					<div class="company">
						<img
							src={images["card/logo/cookie"]}
							alt="Cookie 3"
						></img>
						<div class="company-title">
							<span>Cookie 3</span>
						</div>
					</div>
					<div class="statuses">
						<div class="icon">
							<img src={svg.binance}></img>
						</div>
						<div class="status">Active</div>
						<div class="ecosystem">Ecosystem</div>
					</div>
					<div class="desc">
						<span class="desc-title">Unite To Earn</span>
						<p class="desc-text">
							Is an investment ecosystem that combines a
							Launchpad, an information resource and an academy.
						</p>
					</div>
					<div class="socials">
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/instagram"]}></img>
						</a>
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/facebook"]}></img>
						</a>
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/twitter"]}></img>
						</a>
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/youtube"]}></img>
						</a>
					</div>
					<div class="progressBlock">
						<div
							style={[`width: calc(100% / 100 * 75)`]}
							class="progressBlock-column"
						></div>
					</div>
					<span class="summ">2.500.000$</span>
					<button class="btn">InvesT</button>
				</div>
			</div> */}
			{/* <div class="card-item">
				<img class="card-item_img" src={images["card/1"]} />
				<div class="info">
					<div class="info-bell">
						<div class="circle">123</div>
						<img src={svg["iconsGreen/bell"]} class="bell"></img>
					</div>
					<div class="company">
						<img
							src={images["card/logo/cookie"]}
							alt="Cookie 3"
						></img>
						<div class="company-title">
							<span>Cookie 3</span>
						</div>
					</div>
					<div class="statuses">
						<div class="icon">
							<img src={svg.binance}></img>
						</div>
						<div class="status">Active</div>
						<div class="ecosystem">Ecosystem</div>
					</div>
					<div class="desc">
						<span class="desc-title">Unite To Earn</span>
						<p class="desc-text">
							Is an investment ecosystem that combines a
							Launchpad, an information resource and an academy.
						</p>
					</div>
					<div class="socials">
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/instagram"]}></img>
						</a>
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/facebook"]}></img>
						</a>
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/twitter"]}></img>
						</a>
						<a target="_blank" href="#">
							<img src={svg["iconsGreen/youtube"]}></img>
						</a>
					</div>
					<div class="progressBlock">
						<div
							style={[`width: calc(100% / 100 * 75)`]}
							class="progressBlock-column"
						></div>
					</div>
					<span class="summ">2.500.000$</span>
					<button class="btn">InvesT</button>
				</div>
			</div> */}
		</div>
	)
}

export default forExport