// import React, { useEffect, useRef } from 'react';
// import {
//   InputLabel,
//   MapBoxStyle,
//   MapWrapperStyle,
// } from '../../styles/InputStyles';
// import markerImage from '../../assets/images/marker.svg';
// import markerIconImage from '../../assets/images/markerIcon2.svg';

// interface NaverMapProps {
//   estateName: string;
//   estatePhoneNum: string;
//   address: string;
// }

// const NaverMap: React.FC<NaverMapProps> = ({
//   estateName,
//   estatePhoneNum,
//   address,
// }) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (mapRef.current && window.naver?.maps) {
//       const map = new window.naver.maps.Map(mapRef.current, {
//         center: new window.naver.maps.LatLng(37.5665, 126.978), // Default: Seoul center
//         zoom: 16,
//       });

//       const geocodeAddress = (address: string) => {
//         window.naver.maps.Service.geocode(
//           { query: address },
//           (status: any, response: any) => {
//             if (status === window.naver.maps.Service.Status.ERROR) {
//               console.error('Geocoding failed:', status);
//               alert('주소를 찾을 수 없습니다.');
//               return;
//             }

//             const result = response.v2.addresses[0];
//             if (result) {
//               const lat = parseFloat(result.y); // Latitude
//               const lng = parseFloat(result.x); // Longitude
//               const newLocation = new window.naver.maps.LatLng(lat, lng);

//               // Update map center
//               map.setCenter(newLocation);

//               // Create marker
//               const isSearchMode = false;
//               const searchMarkerElement = `
//                 <div style="position: relative; display: flex; flex-direction:column; align-items:center;">
//                   <div style="display:flex; margin-bottom:2px; background-color: white; padding: 10px; border: 2px solid #0099FF; border-radius: 10px; font-size: 14px; font-weight: bold;">
//                     <img style="padding-right:6px;" src="${markerIconImage}" alt="마커 아이콘">
//                     <div style="display:flex; width:100%; padding-left:6px; border-left:2px solid #0099FF; flex-direction:column; align-items:center;">
//                       <span style="white-space: nowrap" margin-bottom:2px; font-size:16px">${estateName}</span>
//                       <span style="font-size:11px; margin-top:5px">${estatePhoneNum}</span>
//                     </div>
//                   </div>
//                   <img src="${markerImage}" style="max-width: 30px" />
//                 </div>
//               `;

//               const newMarker = new window.naver.maps.Marker({
//                 position: newLocation,
//                 map: isSearchMode ? undefined : map,
//                 title: estateName,
//                 icon: {
//                   content: searchMarkerElement,
//                   anchor: new window.naver.maps.Point(75, 94),
//                 },
//               });

//               // Add click event listener to marker
//               window.naver.maps.Event.addListener(newMarker, 'click', () => {
//                 alert(`Marker clicked: ${estateName}`);
//               });
//             } else {
//               console.error('No results found for the address:', address);
//               alert('주소를 찾을 수 없습니다.');
//             }
//           }
//         );
//       };

//       // Call geocoding function with the address prop
//       geocodeAddress(address);
//     }
//   }, [address, estateName, estatePhoneNum]);

//   return (
//     <MapWrapperStyle>
//       <InputLabel>부동산 위치 보기</InputLabel>
//       <MapBoxStyle>
//         <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
//       </MapBoxStyle>
//     </MapWrapperStyle>
//   );
// };

// export default NaverMap;
