export function handleScrollEvents(scrollValueReceiver: (x: number, y :number) => {x: number, y: number}) {
	const onScrollEvent = (e: any) => {
		const corrected = scrollValueReceiver(e.deltaX, e.deltaY)
		window.scrollTo(corrected.x, corrected.y)
	}

	window.addEventListener("wheel", onScrollEvent);
}