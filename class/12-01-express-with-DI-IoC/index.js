import express from "express";
import { BoardController } from "./mvc/controllers/board.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";

const app = express();

// 서비스 의존성들
const pointService = new PointService(); // 1. 쿠폰 구매 방식이 포인트결제로 변경됨(의존성주입)
const cashService = new CashService(); // 2. new 한번으로 모든 곳에서 재사용 가능(싱글톤패턴)
const productService = new ProductService();

// 상품 API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기
app.post("/products/refund", productController.refundProduct); // 상품 환불하기

// 쿠폰(상품권) API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰(상품권) 구매하기

// 게시판 API
const boardController = new BoardController();
app.get("/boards", boardController.fetchBoards); // 게시글 조회하기
app.post("/boards", boardController.createBoard); // 게시글 등록하기

app.listen(3000);
