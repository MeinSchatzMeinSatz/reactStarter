// "쇼핑몰에서 상품이 품절이면 '품절' 버튼을 보여주고, 품질이 아니면 '구매하기' 버튼을 보여주려면 어떻게 조건부 렌더링할 수 있을까?"

function PurchaseButton({ isSoldOut }) {
    return (
        <div>
            {isSoldOut ? (
                <button disabled>품절</button>
            ) : (
                <button>구마하기</button>
            )}
        </div>
    );
}
