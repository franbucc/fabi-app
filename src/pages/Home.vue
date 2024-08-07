<template>
	<div class="bg-white">
		<div class="absolute inset-x-0 top-0 z-50">

			<Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
				<div class="fixed inset-0 z-50" />
				<DialogPanel
					class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div class="flex items-center justify-between">
						<a href="#" class="-m-1.5 p-1.5">
							<span class="sr-only">Fabi</span>
							<img class="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600" alt="" />
						</a>
						<button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700"
							@click="mobileMenuOpen = false">
							<span class="sr-only">Cerrar Menú</span>
							<XMarkIcon class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-gray-500/10">
							<div class="space-y-2 py-6">
								<a v-for="item in navigation" :key="item.name" :href="item.href"
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
										item.name }}</a>
							</div>
							<div class="py-6">
								<a href="#"
									class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
									in</a>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</div>

		<!-- BANNER -->
		<div v-if="isBannerVisible"
			class="relative isolate flex items-center gap-x-6 overflow-hidden bg-orange-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
			<div class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
				aria-hidden="true">
				<div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-orange-300 to-orange-500 opacity-30"
					style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)">
				</div>
			</div>
			<div class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
				aria-hidden="true">
				<div class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-orange-300 to-orange-500 opacity-30"
					style="clip-path: polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)">
				</div>
			</div>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<p class="text-sm leading-6 text-gray-900">
					<strong class="font-semibold">Bienvenido a Fabi</strong>
					<svg viewBox="0 0 2 2" class="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
						<circle cx="1" cy="1" r="1"></circle>
					</svg>
					Unite ahora y empezá a chatear con la comunidad y guardar tus jugadas.
				</p>
				<router-link to="/registro">
					<p
						class="flex-none rounded-full bg-gray-900 px-4 py-1 text-sm text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
						Registrate <span aria-hidden="true">&rarr;</span>
					</p>
				</router-link>
			</div>
			<div class="flex flex-1 justify-end">
				<button type="button" @click="hideBanner" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
					<span class="sr-only">Dismiss</span>
					<svg class="h-5 w-5 text-gray-900" aria-hidden="true" viewBox="0 0 24 24" fill="none"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
						</path>
					</svg>
				</button>
			</div>
		</div>



		<!-- HERO -->
		<div class="relative isolate px-6 pt-14 lg:px-8">
			<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<img src="../../sobre-nosotros.jpg" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
				<div class="hidden sm:mb-8 sm:flex sm:justify-center">
					<div
						class="relative rounded-full px-7 py-2 text-sm leading-6 text-white ring-1 ring-white hover:ring-gray-900/20">
						El básquet nos motiva a ser mejores. <a href="#" class="font-semibold text-orange-400"><span
								class="absolute inset-0" aria-hidden="true" />Ver más <span
								aria-hidden="true">&rarr;</span></a>
					</div>
				</div>
				<div class="text-center">
					<h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Potenciá tu estilo de juego hoy
						mismo
					</h1>
					<p class="mt-6 text-lg leading-8 text-gray-200">Somos una plataforma dedicada al básquetbol donde
						encontrarás estrategias, foros y tutoriales. Registrate gratis y empezá a disfrutar de la
						experiencia.</p>
					<div class="mt-10 flex items-center justify-center gap-x-6">
						<a href="#"
							class="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">Crear
							Cuenta</a>
						<a href="#" class="text-sm font-semibold leading-6 text-gray-200">Ver Jugadas <span
								aria-hidden="true">→</span></a>
					</div>
				</div>
			</div>

		</div>
	</div>

	<!-- LOGO CLOUDS -->
	<div class="bg-white py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<h2 class="text-center text-lg font-semibold leading-8 text-gray-900">
				Tenemos las estrategias de las mejores ligas del mundo
			</h2>
			<div
				class="mx-auto mt-10 grid max-w-lg grid-cols-2 gap-8 sm:max-w-xl sm:grid-cols-4 sm:gap-x-12 lg:max-w-none lg:grid-cols-4 lg:gap-x-16">
				<img class="max-h-12 w-full object-contain" src="../../nba.png" alt="NBA" width="158" height="48" />
				<img class="max-h-12 w-full object-contain" src="../../3x3.png" alt="3x3" width="158" height="48" />
				<img class="max-h-12 w-full object-contain" src="../../fiba.png" alt="FIBA" width="158" height="48" />
				<img class="max-h-12 w-full object-contain" src="../../euroliga.png" alt="EuroLeague" width="158"
					height="48" />
			</div>
		</div>
	</div>


	<!-- TOP JUGADAS -->
	<div>
		<section class="py-12">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="text-left">
					<h2 class="text-base font-semibold text-orange-600 tracking-wide uppercase">Jugadas destacadas</h2>
					<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Jugadas más Populares
					</p>
				</div>
				<div class="mt-10 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
					<div v-for="(post, index) in jugadas" :key="index" class="group relative">
						<div class="w-full h-64 bg-white rounded-lg overflow-hidden group-hover:opacity-75">
							<img :src="post.image" alt="Blog image" class="w-full h-full object-center object-cover">
						</div>
						<div class="mt-6">
							<div class="flex space-x-1 text-sm text-gray-500">
								<time :datetime="post.date">{{ post.date }}</time>
								<span aria-hidden="true">&middot;</span>
								<span>{{ post.category }}</span>
							</div>
							<a href="#" class="block mt-2">
								<p class="text-xl font-semibold text-gray-900">{{ post.title }}</p>
								<p class="mt-3 text-base text-gray-500">{{ post.description }}</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- CTA -->
	<router-link to="/registro" v-if="!authUser">
		<div
			class="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-orange-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl mt-9">
			<div class="flex-grow text-center lg:text-left">
				<h2 class="text-2xl font-medium lg:text-3xl">
					¿Estás listo para tu próxima jugada?
				</h2>
				<p class="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
					Entrená tus jugadas favoritas hoy mismo.
				</p>
			</div>
			<div class="flex-shrink-0 w-full text-center lg:w-auto">
				<router-link to="/registro">
					<p
						class="inline-block py-3 mx-auto text-lg font-medium text-center text-orange-600 bg-white rounded-md px-7 lg:px-10 lg:py-5">
						Crear Cuenta</p>
				</router-link>
			</div>
		</div>
	</router-link>

	<!-- BLOG -->
	<div class="bg-white py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tendencias del Foro</h2>
				<p class="mt-2 text-lg leading-8 text-gray-600">Las temáticas y debates más activos de esta semana aquí.
				</p>
			</div>
			<div
				class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
				<article v-for="post in posts" :key="post.id"
					class="flex max-w-xl flex-col items-start justify-between">
					<div class="flex items-center gap-x-4 text-xs">
						<time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
						<a :href="post.category.href"
							class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{
								post.category.title }}</a>
					</div>
					<div class="group relative">
						<h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
							<a :href="post.href">
								<span class="absolute inset-0" />
								{{ post.title }}
							</a>
						</h3>
						<p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
					</div>
					<div class="relative mt-8 flex items-center gap-x-4">
						<img :src="post.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
						<div class="text-sm leading-6">
							<p class="font-semibold text-gray-900">
								<a :href="post.author.href">
									<span class="absolute inset-0" />
									{{ post.author.name }}
								</a>
							</p>
							<p class="text-gray-600">{{ post.author.role }}</p>
						</div>
					</div>
				</article>
			</div>
		</div>
	</div>

	<!-- SECCION CTA -->
	<div class="bg-white">
		<div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
			<div
				class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
				<svg viewBox="0 0 1024 1024"
					class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
					aria-hidden="true">
					<circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
						fill-opacity="0.7" />
					<defs>
						<radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
							<stop stop-color="#FFA500" /> <!-- Color naranja claro -->
							<stop offset="1" stop-color="#FF4500" /> <!-- Color naranja oscuro -->
						</radialGradient>
					</defs>
				</svg>
				<div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
					<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Potenciá tus
						habilidades.<br />Empezá hoy.</h2>
					<p class="mt-6 text-lg leading-8 text-gray-300">Si lo que buscás es mejorar tu estilo de juego
						dentro de la cancha, este es tu lugar.</p>
					<div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
						<router-link to="/jugadas">
							<p
								class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
								Ver Jugadas</p>
						</router-link>
						<router-link to="/registro">
							<p class="text-sm font-semibold leading-6 text-white">Crear Cuenta<span aria-hidden="true">
									→</span></p>
						</router-link>
					</div>
				</div>
				<div class="relative mt-16 h-80 lg:mt-8">
					<img class="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
						src="../../pelotas.jpg" alt="App screenshot" width="1824" height="1080" />
				</div>
			</div>
		</div>
	</div>

	<!-- SOBRE NOSOTROS -->
	<div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
		<img src="../../sobre-nosotros.jpg" alt=""
			class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
		<div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
			aria-hidden="true">
			<div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff5c10] to-[#d85c13] opacity-20"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
		</div>
		<div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
			aria-hidden="true">
			<div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#b34316] to-[#ff653f] opacity-20"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
		</div>
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">Mejorá tu juego hoy</h2>
				<p class="mt-6 text-lg leading-8 text-gray-300">Contamos con un sistema preparado para que lleves tu
					juego al próximo nivel a través de jugadas, tutoriales y videos.</p>
			</div>
			<div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
				<dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
					<div v-for="stat in stats" :key="stat.name" class="flex flex-col-reverse">
						<dt class="text-base leading-7 text-gray-300">{{ stat.name }}</dt>
						<dd class="text-2xl font-bold leading-9 tracking-tight text-white">{{ stat.value }}</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>


	<!-- JUGADAS POR CATEGORÍA -->
	<section class="py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-14 text-center">
				<h2 class="text-4xl text-center font-bold text-gray-900 lg:max-w-2xl lg:mx-auto mb-8">
					Encontrá tu próxima jugada ganadora
				</h2>
				<p class="text-base font-normal text-gray-500 lg:max-w-2xl lg:mx-auto mb-8">
					Utilizando estrategias aplicadas en los mejores equipos del mundo.
				</p>

			</div>
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-lg mx-auto md:max-w-2xl lg:max-w-full">
				<div class="relative w-full h-auto md:col-span-2">
					<div class="bg-orange-950 rounded-2xl flex justify-between flex-row flex-wrap">
						<div class="p-5 xl:p-8 w-full md:w-1/2">
							<div class="block">
								<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M15 12.5V18.75M18.75 2.5L11.25 2.5M15 28.75C8.7868 28.75 3.75 23.7132 3.75 17.5C3.75 11.2868 8.7868 6.25 15 6.25C21.2132 6.25 26.25 11.2868 26.25 17.5C26.25 23.7132 21.2132 28.75 15 28.75Z"
										stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									</path>
								</svg>
							</div>
							<h3 class="text-lg font-bold xl:text-xl text-white py-5 w-full xl:w-64">
								+50 jugadas explicadas paso a paso para vos.
							</h3>
							<p class="text-xs font-normal text-gray-300 w-full mb-8 xl:w-64">
								Seguimos sumando jugadas explicadas al detalle para que mejores tu juego.
							</p>
							<router-link to="/jugadas">
								<button
									class="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
									Ver Jugadas
									<svg width="6" height="10" viewBox="0 0 6 10" fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
											stroke="white" stroke-width="1.6" stroke-linecap="round"
											stroke-linejoin="round"></path>
									</svg>
								</button>
							</router-link>
						</div>
						<div class="relative hidden h-auto md:w-1/2 md:block">
							<img src="../../trama.png" alt="Header tailwind Section" class="h-full ml-auto">
						</div>
					</div>
				</div>
				<div class="relative w-full h-auto">
					<div class="bg-orange-600 rounded-2xl p-5 xl:p-8 h-full">
						<div class="block">
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24.6429 11.4286C24.6429 14.3872 20.2457 16.7857 14.8214 16.7857C9.3972 16.7857 5 14.3872 5 11.4286M24.6429 16.7857C24.6429 19.7444 20.2457 22.1429 14.8214 22.1429C9.3972 22.1429 5 19.7444 5 16.7857M24.6429 22.1429C24.6429 25.1015 20.2457 27.5 14.8214 27.5C9.3972 27.5 5 25.1015 5 22.1429M24.6429 6.96429C24.6429 9.42984 20.2457 11.4286 14.8214 11.4286C9.3972 11.4286 5 9.42984 5 6.96429C5 4.49873 9.3972 2.5 14.8214 2.5C20.2457 2.5 24.6429 4.49873 24.6429 6.96429Z"
									stroke="white" stroke-width="2" stroke-linecap="round"></path>
							</svg>
						</div>
						<h3 class="py-5 text-white text-lg font-bold xl:text-xl">
							Encará el partido de la forma correcta.
						</h3>
						<p class="text-xs font-normal text-white mb-8">
							Mejorá el ataque de tu equipo con nuestra selección de jugadas ofensivas.
						</p>
						<router-link to="/jugadas">
							<button
								class="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
								Ver Jugadas Ofensivas
								<svg width="6" height="10" viewBox="0 0 6 10" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
										stroke="white" stroke-width="1.6" stroke-linecap="round"
										stroke-linejoin="round"></path>
								</svg>
							</button>
						</router-link>
					</div>
				</div>
				<div class="relative w-full h-auto">
					<div class="bg-orange-700 rounded-2xl p-5 xl:p-8 h-full">
						<div class="block">
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M26.7301 15.661C26.7301 22.1995 21.306 27.5 14.6151 27.5C7.9241 27.5 2.5 22.1995 2.5 15.661C2.5 9.1225 7.9241 3.822 14.6151 3.822M18.1313 10.1507L18.1313 4.85383C18.1313 3.22503 19.6455 2.00299 21.1519 2.70013C23.7608 3.90751 26.6177 6.25557 27.456 10.2563C27.7542 11.6798 26.4931 12.8563 25.0064 12.8368L20.7873 12.7814C19.3147 12.762 18.1313 11.5899 18.1313 10.1507Z"
									stroke="white" stroke-width="2" stroke-linecap="round"></path>
							</svg>
						</div>
						<h3 class="py-5 text-white text-lg font-bold xl:text-xl">
							Construí tu defensa con estas jugadas.
						</h3>
						<p class="text-xs font-normal text-white mb-8">
							Si estás cansado de perder por 40 puntos de diferencia acá la solución.
						</p>
						<router-link to="/jugadas">
							<button
								class="py-2 px-5 border border-solid border-gray-300 rounded-full gap-2 text-xs text-white font-semibold flex items-center justify-between transition-all duration-500 hover:bg-white/5">
								Ver Jugadas Defensivas
								<svg width="6" height="10" viewBox="0 0 6 10" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1 9L3.58579 6.41421C4.25245 5.74755 4.58579 5.41421 4.58579 5C4.58579 4.58579 4.25245 4.25245 3.58579 3.58579L1 1"
										stroke="white" stroke-width="1.6" stroke-linecap="round"
										stroke-linejoin="round"></path>
								</svg>
							</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</section>









	<!-- FAQs -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
		<div class="text-center mb-6">
			<h2 class="text-base font-semibold text-orange-600 tracking-wide uppercase">Preguntas Frecuentes</h2>
			<p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
				Recibimos muchas preguntas por día, aquí las principales.
			</p>
		</div>
		<div class="w-full max-w-2xl p-2 mx-auto rounded-2xl">
			<div v-for="(item, index) in faqdata" :key="index" class="mb-5">
				<Disclosure>
					<template v-slot="{ open }">
						<div>
							<DisclosureButton
								class="flex items-center justify-between w-full px-4 py-4 text-lg text-left transition-colors text-white rounded-lg bg-orange-500 hover:bg-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-orange-100 focus-visible:ring-opacity-75">
								<span>{{ item.question }}</span>
								<ChevronUpIcon :class="{ 'transform rotate-180': open }" class="w-5 h-5 text-white" />
							</DisclosureButton>
							<DisclosurePanel class="px-6 pt-6 pb-5 text-gray-500">
								{{ item.answer }}
							</DisclosurePanel>
						</div>
					</template>
				</Disclosure>
			</div>
		</div>
	</div>






</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { ChevronUpIcon } from '@heroicons/vue/24/solid';
import { auth } from '../services/firebase'

const isBannerVisible = ref(true)

function hideBanner() {
	isBannerVisible.value = false
}

onMounted(() => {
	const unsubscribe = auth.onAuthStateChanged(user => {
		if (user) {
			// Usuario está autenticado
			isBannerVisible.value = false
		} else {
			// Usuario no está autenticado
			isBannerVisible.value = true
		}
	})

	// Cleanup subscription on component unmount
	return () => unsubscribe()
})

const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' },
]

// Sobre Nosotros
const stats = [
	{ name: 'Jugadas online', value: '+50' },
	{ name: 'Dedicado al básquet', value: 'Foro Comunitario' },
	{ name: 'En tu perfil personalizado', value: 'Guardá tus jugadas' },
	{ name: 'Usuarios registrados', value: '+300' },
]

// BLOG
const posts = [
	{
		id: 1,
		title: 'Mejores canchas callejeras en CABA',
		href: '#',
		description:
			'Las canchas en mejor estado y gratuitas en la Ciudad de Buenos Aires. ¿Cómo sacar turno? Formación de equipos. Torneos amateurs.',
		date: '16 de Agosto, 2024',
		datetime: '16-03-2024',
		category: { title: 'Amateur', href: '#' },
		author: {
			name: 'Juan Pablo',
			role: 'Ex-jugador profesional',
			href: '#',
			imageUrl:
				'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	},
	{
		"id": 2,
		"title": "Selección Argentina 2024",
		"href": "#",
		"description": "La Selección Argentina de Básquet, con su histórica garra y éxitos, ¿va a poder mantener su nivel competitivo en los próximos juegos olímpicos? ¡Opiná!",
		"date": "15 de Junio, 2024",
		"datetime": "16-03-2024",
		"category": {
			"title": "Selección Argentina",
			"href": "#"
		},
		"author": {
			"name": "Pedro \"El Cholo\" Suarez",
			"role": "DT de Chacarita",
			"href": "#",
			"imageUrl": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		}
	},
	{
		"id": 4,
		"title": "La Liga Nacional 2024",
		"href": "#",
		"description": "Con el nivel creciente de los equipos y jugadores, ¿la Liga Nacional se convertirá en un semillero clave para la NBA? Deja tu mensaje acá abajo.",
		"date": "20 de Agosto, 2024",
		"datetime": "20-08-2024",
		"category": {
			"title": "Liga Nacional",
			"href": "#"
		},
		"author": {
			"name": "María González",
			"role": "Analista Deportiva",
			"href": "#",
			"imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
		}
	}
]

// TOP JUGADAS
const jugadas = [
	{
		date: "20 de Julio, 2024",
		category: "Ofensiva",
		title: "Pick and Roll",
		description: "Una de las jugadas más efectivas en el básquet, donde un jugador bloquea al defensor de su compañero para generar una oportunidad de anotación.",
		author: {
			name: "Juan Pérez",
			role: "Entrenador",
			image: "https://images.unsplash.com/photo-1600289146072-70cb83fec94b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
		},
		image: "https://images.unsplash.com/photo-1518614368389-5160c0b0de72?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		date: "5 de Agosto, 2024",
		category: "Defensiva",
		title: "Zona 2-3",
		description: "Una táctica defensiva en la que los jugadores se colocan en una formación de zona para proteger la pintura y forzar tiros desde el exterior.",
		author: {
			name: "Ana Gómez",
			role: "Analista de Video",
			image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		},
		image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	{
		date: "15 de Septiembre, 2024",
		category: "Transición",
		title: "Fast Break",
		description: "Una estrategia ofensiva que busca aprovechar un contraataque rápido para anotar antes de que la defensa rival se organice.",
		author: {
			name: "Carlos Ruiz",
			role: "Asistente Técnico",
			image: "https://images.unsplash.com/photo-1532074205216-dc468fa03722?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
		},
		image: "https://images.unsplash.com/photo-1616353352910-15d970ac020b?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	}
];



// FAQs

const faqdata = ref([
	{
		question: "¿Para qué me sirve Fabi?",
		answer: "Vas a poder analizar y ver jugadas de todos los equipos de básquet para sumarlas a tu juego."
	},
	{
		question: "¿Puedo escribir en los foros?",
		answer: "Si tienes una cuenta creada, sí vas a poder."
	},
	{
		question: "Quiero publicar mis propias jugadas ¿cómo lo hago?",
		answer: "Si quieres ser parte de la administración de la app, envíanos un mensaje a nuestras redes sociales con tu propuesta."
	},
	{
		question: "¿Cómo almaceno mis jugadas favoritas?",
		answer: "Para marcar una jugada como favorita deberás estar logueado y presionar el botón con forma de corazón para almacenarla en tu perfil."
	}
]);

const mobileMenuOpen = ref(false)


</script>