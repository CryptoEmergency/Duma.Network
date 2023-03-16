import {
	jsx,
	jsxFrag,
	Variable,
	initReload,
} from '@betarost/cemserver/cem.js';
import { fn } from '@src/functions/export.js';
import svg from "@assets/svg/index.js";

const forExport = function ({ Static, onclick, className }) {
	return (
		<div class="sidebar">
			{/* <div
                        class={["menu-icon", burger ? "active" : null]}
                        onclick={function () {
                          burger = !burger;
                          initReload();
                        }}
                      >
                        <span></span>
                      </div> */}
			<div class="nums">
				<span class="num_big">17,805</span>
				<span class="num_small">+1,500$</span>
				<span class="num_small"> +4,17%</span>
			</div>
			<nav>
				<ul class="sidebar-list">
					<li class="sidebar-item">
						<a
							onclick={() => {
								fn.siteLink("/");
							}}
						>
							<img
								src={svg["personal/icons/main"]}
								class="sidebar-icon"
							></img>
							<span>Главная</span>
						</a>
					</li>
					<li class="sidebar-item">
						<a>
							<img
								src={svg["personal/icons/wallet"]}
								class="sidebar-icon"
							></img>
							<span class="passive-text">Кошелек</span>
						</a>
					</li>
					<li class="sidebar-item">
						<a>
							<img
								src={svg["personal/icons/briefcase"]}
								class="sidebar-icon"
							></img>
							<span class="passive-text">Портфель</span>
						</a>
					</li>
					<li class="sidebar-item">
						<a>
							<img
								src={svg["personal/icons/structure"]}
								class="sidebar-icon"
							></img>
							<span class="passive-text">Структура</span>
						</a>
					</li>
					<li class="sidebar-item">
						<a>
							<img
								src={svg["personal/icons/message"]}
								class="sidebar-icon"
							></img>
							<span class="passive-text">Сообщения</span>
						</a>
					</li>
					<li class="sidebar-item">
						<a>
							<img
								src={svg["personal/icons/profile"]}
								class="sidebar-icon"
							></img>
							<span class="passive-text">Профиль</span>
						</a>
					</li>
					<li class="sidebar-item">
						<a>
							<img
								src={svg["personal/icons/setting"]}
								class="sidebar-icon"
							></img>
							<span class="passive-text">Настройки</span>
						</a>
					</li>
				</ul>
			</nav>
			<span
				class="sidebar-out"
				onclick={() => {
					setStorage("auth", false);
					setStorage("myInfo", {});
					setStorage("uuid", 0);
					window.location = "/";
				}}
			>
				LOGOUT<img src={svg["personal/icons/logout"]}></img>
			</span>
			<div class="sidebar-btns">
				<button class="btn-empty">ПРЕДЛОЖИТЬ ИДЕЮ</button>
				<button class="btn-empty">Bug report</button>
				<button class="btn-empty">ХОЧУ В КОМАНДУ</button>
			</div>
		</div>
	)
}

export default forExport
