import getOfflineAudioContext, { audioHTML } from './audio'
import getCanvas2d, { canvasHTML } from './canvas'
import getCSS, { cssHTML } from './css'
import getCSSMedia, { cssMediaHTML } from './cssmedia'
import getHTMLElementVersion, { htmlElementVersionHTML } from './document'
import getClientRects, { clientRectsHTML } from './domrect'
import getConsoleErrors, { consoleErrorsHTML } from './engine'
import { timer, getCapturedErrors, caniuse, errorsHTML, attempt } from './errors'
import getEngineFeatures, { featuresHTML, getFeaturesLie } from './features'
import getFonts, { fontsHTML } from './fonts'
import getHeadlessFeatures, { headlessFeaturesHTML } from './headless'
import getIntl, { intlHTML } from './intl'
import { getLies, PARENT_PHANTOM, liesHTML, PROTO_BENCHMARK } from './lies'
import getMaths, { mathsHTML } from './math'
import getMedia, { mediaHTML } from './media'
import getNavigator, { navigatorHTML } from './navigator'
import getPrediction, { getBlankIcons, predictionErrorPatch, renderPrediction } from './prediction'
import getResistance, { resistanceHTML } from './resistance'
import renderSamples, { getSamples, getRawFingerprint } from './samples'
import getScreen, { screenHTML } from './screen'
import getVoices, { voicesHTML } from './speech'
import { getStatus, getStorage, statusHTML } from './status'
import getSVG, { svgHTML } from './svg'
import getTimezone, { timezoneHTML } from './timezone'
import { getTrash, trashHTML } from './trash'
import { hashify, hashMini, getBotHash, getFuzzyHash, cipher } from './utils/crypto'
import { exile, getStackBytes, getTTFB, measure } from './utils/exile'
import { IS_BLINK, braveBrowser, getBraveMode, getBraveUnprotectedParameters, computeWindowsRelease, hashSlice, ENGINE_IDENTIFIER, getUserAgentRestored, attemptWindows11UserAgent, LowerEntropy, queueTask, Analysis } from './utils/helpers'
// import { patch, html, getDiffs, modal, HTMLNote } from './utils/html'
import getCanvasWebgl, { webglHTML } from './webgl'
// import getWebRTCData, { getWebRTCDevices, webrtcHTML } from './webrtc'
import getWindowFeatures, { windowFeaturesHTML } from './window'
import getBestWorkerScope, { Scope, spawnWorker, workerScopeHTML } from './worker'

!async function() {
	'use strict';

	const scope = await spawnWorker()

	if (scope == Scope.WORKER) {
		return
	}

	await queueTask()
	// const stackBytes = getStackBytes()
	let mpc = false
	try {
		mpc = /C0DE/.test((x => x ? x.getParameter(x.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL) : '')(
			document.createElement('canvas').getContext('webgl')),
		)
	} catch { }
	// const [measuredTime, ttfb, aInfo, sQuota] = await Promise.all([
	// 	// exile(),
	// 	measure(),
	// 	getTTFB(),
	// 	// @ts-expect-error if unsupported
	// 	'gpu' in navigator ? navigator.gpu.requestAdapter().then((x) => x || mpc ? true : null) : null,
	// 	getStorage(),
	// ])
	// console.clear()
	// const measured = (outerWidth - innerWidth < 150) && (outerHeight - innerHeight < 150) ? measuredTime : 0

	const isBrave = IS_BLINK ? braveBrowser() : false
	const braveMode = isBrave ? getBraveMode() : {}
	const braveFingerprintingBlocking = isBrave && (braveMode.standard || braveMode.strict)

	const fingerprint = async () => {
		const timeStart = timer();
		// const fingerprintTimeStart = timer();
		const [
			workerScopeComputed,
			voicesComputed,
			offlineAudioContextComputed,
			canvasWebglComputed,
			canvas2dComputed,
			windowFeaturesComputed,
			htmlElementVersionComputed,
			cssComputed,
			cssMediaComputed,
			screenComputed,
			mathsComputed,
			consoleErrorsComputed,
			timezoneComputed,
			clientRectsComputed,
			fontsComputed,
			mediaComputed,
			svgComputed,
			resistanceComputed,
			intlComputed,
		] = await Promise.all([
			getBestWorkerScope(),
			getVoices(),
			getOfflineAudioContext(),
			getCanvasWebgl(),
			getCanvas2d(),
			getWindowFeatures(),
			getHTMLElementVersion(),
			getCSS(),
			getCSSMedia(),
			getScreen(),
			getMaths(),
			getConsoleErrors(),
			getTimezone(),
			getClientRects(),
			getFonts(),
			getMedia(),
			getSVG(),
			getResistance(),
			getIntl(),
		]).catch((error) => console.error(error.message))

		const navigatorComputed = await getNavigator(workerScopeComputed)
			.catch((error) => console.error(error.message))

		// @ts-ignore
		const [
			headlessComputed,
			featuresComputed,
		] = await Promise.all([
			getHeadlessFeatures({
				webgl: canvasWebglComputed,
				workerScope: workerScopeComputed,
			}),
			getEngineFeatures({
				cssComputed,
				navigatorComputed,
				windowFeaturesComputed,
			}),
		]).catch((error) => console.error(error.message))

		// @ts-ignore
		const [
			liesComputed,
			trashComputed,
			capturedErrorsComputed,
		] = await Promise.all([
			getLies(),
			getTrash(),
			getCapturedErrors(),
		]).catch((error) => console.error(error.message))

		// console.log('trashComputed', trashComputed);
		// console.log('liesComputed', liesComputed);

		// const fingerprintTimeEnd = fingerprintTimeStart()
		// console.log(`Fingerprinting complete in ${(fingerprintTimeEnd).toFixed(2)}ms`)

		// GPU Prediction
		const { parameters: gpuParameter } = canvasWebglComputed || {}
		const reducedGPUParameters = {
			...(
				braveFingerprintingBlocking ? getBraveUnprotectedParameters(gpuParameter) :
					gpuParameter
			),
			RENDERER: undefined,
			SHADING_LANGUAGE_VERSION: undefined,
			UNMASKED_RENDERER_WEBGL: undefined,
			UNMASKED_VENDOR_WEBGL: undefined,
			VERSION: undefined,
			VENDOR: undefined,
		}

		// Hashing
		const hashStartTime = timer()
		// @ts-ignore
		const [
			windowHash,
			headlessHash,
			htmlHash,
			cssMediaHash,
			cssHash,
			styleHash,
			styleSystemHash,
			screenHash,
			voicesHash,
			canvas2dHash,
			canvas2dImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglHash,
			canvasWebglImageHash,
			canvasWebglParametersHash,
			pixelsHash,
			pixels2Hash,
			mathsHash,
			consoleErrorsHash,
			timezoneHash,
			rectsHash,
			domRectHash,
			audioHash,
			fontsHash,
			workerHash,
			mediaHash,
			mimeTypesHash,
			navigatorHash,
			liesHash,
			trashHash,
			errorsHash,
			svgHash,
			resistanceHash,
			intlHash,
			featuresHash,
			deviceOfTimezoneHash,
		] = await Promise.all([
			hashify(windowFeaturesComputed),
			hashify(headlessComputed),
			hashify((htmlElementVersionComputed || {}).keys),
			hashify(cssMediaComputed),
			hashify(cssComputed),
			hashify((cssComputed || {}).computedStyle),
			hashify((cssComputed || {}).system),
			hashify(screenComputed),
			hashify(voicesComputed),
			hashify(canvas2dComputed),
			hashify((canvas2dComputed || {}).dataURI),
			hashify((canvas2dComputed || {}).paintURI),
			hashify((canvas2dComputed || {}).textURI),
			hashify((canvas2dComputed || {}).emojiURI),
			hashify(canvasWebglComputed),
			hashify((canvasWebglComputed || {}).dataURI),
			hashify(reducedGPUParameters),
			((canvasWebglComputed || {}).pixels || []).length ? hashify(canvasWebglComputed.pixels) : undefined,
			((canvasWebglComputed || {}).pixels2 || []).length ? hashify(canvasWebglComputed.pixels2) : undefined,
			hashify((mathsComputed || {}).data),
			hashify((consoleErrorsComputed || {}).errors),
			hashify(timezoneComputed),
			hashify(clientRectsComputed),
			hashify([
				(clientRectsComputed || {}).elementBoundingClientRect,
				(clientRectsComputed || {}).elementClientRects,
				(clientRectsComputed || {}).rangeBoundingClientRect,
				(clientRectsComputed || {}).rangeClientRects,
			]),
			hashify(offlineAudioContextComputed),
			hashify(fontsComputed),
			hashify(workerScopeComputed),
			hashify(mediaComputed),
			hashify((mediaComputed || {}).mimeTypes),
			hashify(navigatorComputed),
			hashify(liesComputed),
			hashify(trashComputed),
			hashify(capturedErrorsComputed),
			hashify(svgComputed),
			hashify(resistanceComputed),
			hashify(intlComputed),
			hashify(featuresComputed),
			hashify((() => {
				const {
					bluetoothAvailability,
					device,
					deviceMemory,
					hardwareConcurrency,
					maxTouchPoints,
					oscpu,
					platform,
					system,
					userAgentData,
				} = navigatorComputed || {}
				const {
					architecture,
					bitness,
					mobile,
					model,
					platform: uaPlatform,
					platformVersion,
				} = userAgentData || {}
				const { 'any-pointer': anyPointer } = cssMediaComputed?.mediaCSS || {}
				const { colorDepth, pixelDepth, height, width } = screenComputed || {}
				const { location, locationEpoch, zone } = timezoneComputed || {}
				const {
					deviceMemory: deviceMemoryWorker,
					hardwareConcurrency: hardwareConcurrencyWorker,
					gpu,
					platform: platformWorker,
					system: systemWorker,
					timezoneLocation: locationWorker,
					userAgentData: userAgentDataWorker,
				} = workerScopeComputed || {}
				const { compressedGPU, confidence } = gpu || {}
				const {
					architecture: architectureWorker,
					bitness: bitnessWorker,
					mobile: mobileWorker,
					model: modelWorker,
					platform: uaPlatformWorker,
					platformVersion: platformVersionWorker,
				} = userAgentDataWorker || {}

				return [
					anyPointer,
					architecture,
					architectureWorker,
					bitness,
					bitnessWorker,
					bluetoothAvailability,
					colorDepth,
					...(compressedGPU && confidence != 'low' ? [compressedGPU] : []),
					device,
					deviceMemory,
					deviceMemoryWorker,
					hardwareConcurrency,
					hardwareConcurrencyWorker,
					height,
					location,
					locationWorker,
					locationEpoch,
					maxTouchPoints,
					mobile,
					mobileWorker,
					model,
					modelWorker,
					oscpu,
					pixelDepth,
					platform,
					platformWorker,
					platformVersion,
					platformVersionWorker,
					system,
					systemWorker,
					uaPlatform,
					uaPlatformWorker,
					width,
					zone,
				]
			})()),
		]).catch((error) => console.error(error.message))

		// console.log(performance.now()-start)
		// const hashTimeEnd = hashStartTime()
		const timeEnd = timeStart()

		// console.log(`Hashing complete in ${(hashTimeEnd).toFixed(2)}ms`)

		if (PARENT_PHANTOM) {
			// @ts-ignore
			PARENT_PHANTOM.parentNode.removeChild(PARENT_PHANTOM)
		}

		const fingerprint = {
			workerScope: !workerScopeComputed ? undefined : { ...workerScopeComputed, $hash: workerHash},
			navigator: !navigatorComputed ? undefined : {...navigatorComputed, $hash: navigatorHash},
			windowFeatures: !windowFeaturesComputed ? undefined : {...windowFeaturesComputed, $hash: windowHash},
			headless: !headlessComputed ? undefined : {...headlessComputed, $hash: headlessHash},
			htmlElementVersion: !htmlElementVersionComputed ? undefined : {...htmlElementVersionComputed, $hash: htmlHash},
			cssMedia: !cssMediaComputed ? undefined : {...cssMediaComputed, $hash: cssMediaHash},
			css: !cssComputed ? undefined : {...cssComputed, $hash: cssHash},
			screen: !screenComputed ? undefined : {...screenComputed, $hash: screenHash},
			voices: !voicesComputed ? undefined : {...voicesComputed, $hash: voicesHash},
			media: !mediaComputed ? undefined : {...mediaComputed, $hash: mediaHash},
			canvas2d: !canvas2dComputed ? undefined : {...canvas2dComputed, $hash: canvas2dHash},
			canvasWebgl: !canvasWebglComputed ? undefined : {...canvasWebglComputed, pixels: pixelsHash, pixels2: pixels2Hash, $hash: canvasWebglHash},
			maths: !mathsComputed ? undefined : {...mathsComputed, $hash: mathsHash},
			consoleErrors: !consoleErrorsComputed ? undefined : {...consoleErrorsComputed, $hash: consoleErrorsHash},
			timezone: !timezoneComputed ? undefined : {...timezoneComputed, $hash: timezoneHash},
			clientRects: !clientRectsComputed ? undefined : {...clientRectsComputed, $hash: rectsHash},
			offlineAudioContext: !offlineAudioContextComputed ? undefined : {...offlineAudioContextComputed, $hash: audioHash},
			fonts: !fontsComputed ? undefined : {...fontsComputed, $hash: fontsHash},
			lies: !liesComputed ? undefined : {...liesComputed, $hash: liesHash},
			trash: !trashComputed ? undefined : {...trashComputed, $hash: trashHash},
			capturedErrors: !capturedErrorsComputed ? undefined : {...capturedErrorsComputed, $hash: errorsHash},
			svg: !svgComputed ? undefined : {...svgComputed, $hash: svgHash },
			resistance: !resistanceComputed ? undefined : {...resistanceComputed, $hash: resistanceHash},
			intl: !intlComputed ? undefined : {...intlComputed, $hash: intlHash},
			features: !featuresComputed ? undefined : {...featuresComputed, $hash: featuresHash},
		}

		return {
			fingerprint,
			styleSystemHash,
			styleHash,
			domRectHash,
			mimeTypesHash,
			canvas2dImageHash,
			canvasWebglImageHash,
			canvas2dPaintHash,
			canvas2dTextHash,
			canvas2dEmojiHash,
			canvasWebglParametersHash,
			deviceOfTimezoneHash,
			timeEnd,
		}
	}

	// fingerprint and render
	// const f = await fingerprint().catch((error) => console.error(error));
	// const {
	// 		fingerprint: fp,
	// 		// styleSystemHash,
	// 		// styleHash,
	// 		// domRectHash,
	// 		// mimeTypesHash,
	// 		// canvas2dImageHash,
	// 		// canvas2dPaintHash,
	// 		// canvas2dTextHash,
	// 		// canvas2dEmojiHash,
	// 		// canvasWebglImageHash,
	// 		// canvasWebglParametersHash,
	// 		// deviceOfTimezoneHash,
	// 		// timeEnd,
	// 	} = f;

	// window.__fp = f;
	// fingerprint()
	// 	.then(console.log)
	// 	.catch(console.log)

  const fp = await fingerprint();

	const getFingerprint = () => fp;

	window.f = getFingerprint;

	setInterval(() => {
		if (window.f !== getFingerprint) {
			window.f = getFingerprint;
			console.log('Restore function');
		}
	}, window.__fp_interval || 5000);

	// if (!fp) {
	// 	throw new Error('Fingerprint failed!')
	// }
}()
