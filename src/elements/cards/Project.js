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
						<img class="card-item_img" src={images[`card/${item.galery[0]}`]} />
						<div class="info">
							<div class="info-bell">
								<div class="circle">{item.rang ? item.rang : 0}</div>
								<img src={svg["iconsGreen/bell"]} class="bell"></img>
							</div>
							<div class="company">
								<img src={images[`card/logo/${item.icon}`]}></img>
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
							</div>
							<div class="desc">
								<span class="desc-title">{item.title}</span>
								<p class="desc-text">
									{item.description}
								</p>
							</div>
							<div class="socials">
								{item.social.map((element) => {
									// console.log(element.name, svg[`iconsGreen/${element.name}`]);

									return (
										<a target="_blank" href={element.link}>
											<img
												alt="Telegram"
												src={svg[`iconsGreen/${element.name}`]}
												class="icon-green"
											></img>
										</a>
									);
								})}
							</div>
							{item.price && item.targetPrice ? (
								<div class="progressBlock">
									<div
										style={[
											`width: calc(100% / 100 * ${item.targetPrice / item.havePrice
											})`,
										]}
										class="progressBlock-column"
									></div>
								</div>
							) : null}
							<span class="summ">{item.targetPrice}$</span>
							<button class="btn">InvesT</button>
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