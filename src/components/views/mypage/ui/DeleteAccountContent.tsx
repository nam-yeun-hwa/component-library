const DeleteAccountContent = () => {
  return (
    <>
      <p className="mb-4 text-center">
        회원 탈퇴 완료 후,
        <br />
        해당 계정 내 모든 데이터가 삭제되며
        <br />
        복구 할 수 없습니다.
      </p>
      <p className="text-red-danger text-center">
        60일동안 재가입할 수 없습니다.
      </p>
    </>
  );
};

export default DeleteAccountContent;
