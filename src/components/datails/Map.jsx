function Map({ lat, lon }) {
	const zoom = 15;
	return (
		<div className="aspect-square rounded-lg overflow-hidden">
			{/* src="//maps.google.com/maps?q=latitude,longitude&z=zoom&output=embed" */}
			<iframe
				src={`//maps.google.com/maps?q=${lat},${lon}&z=${zoom}&output=embed`}
				width={600}
				height={450}
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade "
				className="w-full h-full"
			></iframe>
		</div>
	);
}
export default Map;
