import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-6">프론트엔드 개발 진행중....</h2>
      <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <Link href="/home">
        <button
          style={{ backgroundColor: "#0099ff" }}
          className="px-4 py-3 text-white rounded-lg hover:bg-blue-700 transition"
        >
          홈으로 돌아가기
        </button>
      </Link>
    </div>
  );
}
