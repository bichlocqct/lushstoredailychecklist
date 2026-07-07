// Pre-populated report database for LUSH store visits
const REPORT_DATA = {
  weeks: {
    "2026-W27": {
      id: "2026-W27",
      name: "29/06/2026 - 05/07/2026",
      overall: {
  "title": "OVERALL COMMENTS - RETAIL OPERATION STORE VISIT",
  "stores": "Lush Hùng Vương Plaza, Lush Vincom Đồng Khởi, Lush Saigon Center",
  "period": "29/06/2026 – 05/07/2026",
  "summary": [
    {
      "store": "Lush Saigon Center",
      "date": "29/06/2026",
      "staff": "4",
      "vmd": "Good (VM: 43/45)",
      "storeroom": "Good (14/15)",
      "tester": "Good (13/15)",
      "stock": "Gap 0",
      "comment": "Nhân viên tư vấn tốt, nắm vững kiến thức sản phẩm và link sale hiệu quả. Cần cải thiện tester, lau bụi khu vực bath bomb/bubble bars và sắp xếp lại vật dụng trong kho."
    },
    {
      "store": "Lush Vincom Đồng Khởi",
      "date": "30/06/2026",
      "staff": "5",
      "vmd": "Good (VM: 43/45)",
      "storeroom": "Good (15/15)",
      "tester": "Good (14/15)",
      "stock": "Gap 0",
      "comment": "Vận hành tốt, nhân sự tư vấn nhiệt tình và link sale tốt. Kho đã sạch hơn, cây trang trí được chăm sóc tốt hơn. Cần lau bụi một số kệ, chuẩn hóa tester và bổ sung topping cho FFM."
    },
    {
      "store": "Lush Hùng Vương Plaza",
      "date": "01/07/2026",
      "staff": "2",
      "vmd": "Good (VM: 44/45)",
      "storeroom": "Good (15/15)",
      "tester": "Good (13/15)",
      "stock": "Gap 0",
      "comment": "Cửa hàng vận hành tốt, nhân viên tư vấn và link sale tốt, kho hàng sạch sẽ. Cần thay tester mới đúng thời điểm, vệ sinh tester và xử lý bụi ở kệ trưng bày."
    }
  ],
  "general_observations": [
    "Nhìn chung, cả 3 store tại TP. Hồ Chí Minh đang vận hành ổn định và duy trì mức tuân thủ tốt đối với các tiêu chuẩn Retail Operation của LUSH. Các hạng mục VMD, Storeroom, Tester và Staff đều được đánh giá Good; random stock check tại cả 3 cửa hàng đều không có chênh lệch hàng hóa.",
    "Điểm mạnh nổi bật nằm ở chất lượng tư vấn và kiến thức sản phẩm của nhân viên. Đội ngũ tại các cửa hàng đều tư vấn tốt, nắm vững kiến thức sản phẩm và có khả năng link sale hiệu quả. Các tiêu chuẩn vận hành cơ bản như grooming, đồng phục, routine, TV content, bảng thông tin/giá sản phẩm và khu vực bán hàng nhìn chung được duy trì tốt.",
    "Khu vực cần tập trung cải thiện nhất là housekeeping và tester management. Bụi vẫn xuất hiện tại một số kệ trưng bày, kệ đen, sản phẩm không bao bì và khu vực bath bomb/bubble bars. Một số tester chưa đúng quy chuẩn, chưa được thay mới đúng thời điểm hoặc cần vệ sinh kỹ hơn. Ngoài ra, một vài điểm vận hành riêng của từng store như FFM thiếu topping tại VCDK và sắp xếp vật dụng trong kho tại SGCT cần được follow-up trước lần visit tiếp theo."
  ],
  "green_points": [
    "Cả 3 store vận hành ổn định, không ghi nhận vấn đề nghiêm trọng trong quá trình kiểm tra.",
    "Nhân viên tư vấn tốt, nắm vững kiến thức sản phẩm và link sale hiệu quả; đây là điểm mạnh chung cần tiếp tục duy trì.",
    "VMD đạt Good ở cả 3 cửa hàng; các tiêu chuẩn về routine, TV content, bảng thông tin/giá sản phẩm, best-seller display và khu vực bán hàng cơ bản được thực hiện tốt.",
    "Random stock check tại cả 3 store đều có Gap 0, cho thấy kiểm soát tồn kho và số liệu hệ thống đang chính xác.",
    "Storeroom được đánh giá Good ở cả 3 store; VCDK đã có cải thiện về việc dọn kho và chăm sóc cây trang trí, HVP duy trì kho hàng sạch sẽ."
  ],
  "red_points": [
    "Vệ sinh sàn bán hàng cần được siết chặt hơn, đặc biệt là kệ đen, kệ trưng bày, sản phẩm không bao bì và khu vực bath bomb/bubble bars.",
    "Tester management cần cải thiện ở cả 3 store: kiểm tra dung lượng tester, thay tester mới kịp thời và vệ sinh tester thường xuyên hơn.",
    "Luôn ready cho khu vực FFM, và xử lý bụi trên một số kệ và chuẩn hóa các tester chưa đúng quy chuẩn.",
    "Cần chú ý bụi tại các sản phẩm khu vực bath bomb/bubble bars và sắp xếp lại các vật dụng trong kho để khu vực back of house gọn hơn.",
    "Nhân sự thường xuyên giữ tạp dề sạch sẽ không bám bẩn."
  ],
  "proposed_actions": [
    {
      "issue": "Dust on shelves and products",
      "stores": "All stores",
      "action": "Tăng tần suất lau kệ và sản phẩm trong ngày, ưu tiên kệ đen, naked products, khu vực bath bomb/bubble bars, display table và các kệ thường xuyên tiếp xúc với khách hàng.",
      "priority": "High"
    },
    {
      "issue": "Tester management",
      "stores": "All stores",
      "action": "Kiểm tra tester đầu ca và giữa ca; thay tester mới khi dung lượng thấp hoặc không còn đạt chuẩn; vệ sinh tester thường xuyên và thu hồi tester cũ.",
      "priority": "High"
    },
    {
      "issue": "FFM topping readiness",
      "stores": "All stores",
      "action": "Bổ sung topping cho khu vực FFM và kiểm tra mức độ ready trước giờ cao điểm; ghi nhận vào checklist ca để tránh thiếu topping lặp lại.",
      "priority": "Medium"
    },
    {
      "issue": "Storeroom organization",
      "stores": "All stores",
      "action": "Sắp xếp lại vật dụng trong kho, duy trì zoning rõ ràng, không để vật dụng cá nhân/hàng hóa sai khu vực; rà soát nhanh cuối mỗi ca.",
      "priority": "Medium"
    },
    {
      "issue": "Store-specific follow-up",
      "stores": "All stores",
      "action": "Theo dõi các lỗi đã ghi nhận trong lần visit này và kiểm tra lại trước lần visit tiếp theo để đảm bảo không lặp lại cùng một điểm cần cải thiện.",
      "priority": "Medium"
    }
  ],
  "follow_up": [
    {
      "store": "Lush Vincom Đồng Khởi",
      "focus": "Bổ sung topping FFM; lau bụi các kệ còn bẩn; kiểm tra và chuẩn hóa tester.",
      "expected": "Khu vực FFM luôn ready, kệ trưng bày sạch hơn và tester đạt đúng quy chuẩn trong ca bán hàng."
    },
    {
      "store": "Lush Saigon Center",
      "focus": "Vệ sinh khu vực bath bomb/bubble bars; thay tester mới kịp thời; sắp xếp lại vật dụng trong kho.",
      "expected": "Store duy trì hình ảnh fresh đồng đều hơn, kho gọn hơn và không lặp lại comment về tester hoặc bụi ở khu vực bath bomb/bubble bars."
    },
    {
      "store": "Lush Hùng Vương Plaza",
      "focus": "Vệ sinh tester; thay tester mới đúng thời điểm; lau bụi ở các kệ trưng bày.",
      "expected": "Tester sạch, đủ dung lượng và đúng quy định; kệ trưng bày sạch hơn, không còn bụi tại các điểm khách dễ nhìn thấy."
    }
  ]
},
      stores: {
  "HVP": {
    "metadata": {
      "store": "Lush Hùng Vương Plaza",
      "visitDate": "7/1/2026",
      "visitTime": "13h30",
      "staffOnDuty": "2"
    },
    "kpi": {
      "staff": "Staff",
      "vmd": "VMD",
      "storeroom": "Storeroom",
      "tester": "Tester",
      "stock": "Stock"
    },
    "vm": {
      "total": "44",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Nhìn chung, tổng quan shop, sàn nhà có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Khu vực kệ trưng bày bath bomb/bubble bars có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Tất cả sản phẩm phải không có bụi, đặc biệt là các sản phẩm không bao bì.",
          "score": "2"
        },
        {
          "id": 4,
          "question": "Tất cả các kệ trưng bày không có bụi, đặc biệt là các kệ đen",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Các vật trang trí nhỏ chậu cây, bình hoa có được vệ sinh thường xuyên và đặt đúng vị trí chưa?",
          "score": "3"
        },
        {
          "id": 6,
          "question": "Các bước trong routine đã được sắp xếp hợp lý để dễ dàng liên kết với việc bán hàng chưa?",
          "score": "3"
        },
        {
          "id": 7,
          "question": "Các sản phẩm bán chạy nhất đã được trưng bày theo bố cục tam giác, với màu sắc phối hợp theo bánh xe màu chưa?",
          "score": "3"
        },
        {
          "id": 8,
          "question": "Các thiết bị cần sửa chữa tại cửa hàng đã được báo cáo chưa?",
          "score": "3"
        },
        {
          "id": 9,
          "question": "Đảm bảo tất cả TV luôn được bật và phát đúng nội dung video hàng tháng.",
          "score": "3"
        },
        {
          "id": 10,
          "question": "Đảm bảo các sản phẩm gần hết hạn luôn được trưng bày theo nguyên tắc FIFO, đồng thời tránh hoặc giảm thiểu việc trưng bày các sản phẩm còn hạn sử dụng quá xa.",
          "score": "3"
        },
        {
          "id": 11,
          "question": "Các hộp quà Knot Wrap đã được gói theo đúng hướng dẫn của LUSH chưa?",
          "score": "3"
        },
        {
          "id": 12,
          "question": "Các sản phẩm push sale tại quầy thu ngân đã được lựa chọn phù hợp chưa?",
          "score": "3"
        },
        {
          "id": 13,
          "question": "Tất cả bảng thông tin và giá sản phẩm cần thiết đã được trưng bày đầy đủ bằng font chữ Lush để đảm bảo truyền đạt thông tin rõ ràng và đầy đủ đến khách hàng chưa?",
          "score": "3"
        },
        {
          "id": 14,
          "question": "Thau bột, bàn FFM có ready chưa?",
          "score": "3"
        },
        {
          "id": 15,
          "question": "Bồn nước, bồn rửa tay có sạch sẽ chưa?",
          "score": "3"
        }
      ]
    },
    "storeroom": {
      "total": "15",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Nhìn chung, kho hàng có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tất cả các thùng không sử dụng đã được niêm phong và dán nhãn bằng giấy A4 bên ngoài, thể hiện tên sản phẩm và số lượng chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Các sản phẩm đã được đặt đúng khu vực quy định trong kho chưa?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Đã thiết lập khu vực riêng cho chai tester rỗng, văn phòng phẩm và sản phẩm vệ sinh chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Sản phẩm bulk nên được lưu trữ trong thùng carton lớn theo nguyên tắc sau: sản phẩm nhẹ đặt phía trên, sản phẩm nặng đặt phía dưới, hàng cũ đặt phía trước, hàng mới đặt phía sau, và các sản phẩm chưa sử dụng đặt sâu nhất bên trong.",
          "score": "3"
        }
      ]
    },
    "tester": {
      "total": "13",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Cửa hàng có cập nhật file nhập - xuất tester thường xuyên không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tất cả tester đã được dán nhãn tester, đóng dấu, ký xác nhận và ghi ngày bắt đầu sử dụng chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Tất cả tester bị rơi/vỡ đã được thu hồi chưa? Nếu chưa, chúng có đang được thu gom và đặt đúng khu vực/tủ lưu trữ quy định không?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Tester có được vệ sinh sạch sẽ chưa?",
          "score": "2"
        },
        {
          "id": 5,
          "question": "Tất cả sản phẩm phải có tester, trong đó các sản phẩm bán chạy cần còn ít nhất 1/3 dung lượng và các sản phẩm bán chậm cần còn ít nhất 1/2 dung lượng.",
          "score": "2"
        }
      ]
    },
    "staff": {
      "total": "15",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Đồng phục đúng guideline chưa?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tóc/ Makeup/ Bảng tên đúng chuẩn chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Thái độ tư vấn, tiếp cận khách hàng có đúng chuẩn chưa?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Có nắm vững kiến thức sản phẩm và link sale đúng chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Đồ dùng cá nhân đặt trong kho có đúng quy định và gọn gàng chưa?",
          "score": "3"
        }
      ]
    },
    "payment": [
      {
        "col0": "6/29/2026",
        "col1": "-",
        "col2": "3,325,000",
        "col3": "3,325,000"
      },
      {
        "col0": "",
        "col1": "NA",
        "col2": "NA",
        "col3": "NA"
      }
    ],
    "petty_cash": [
      {
        "time": "15h00",
        "system": "2,000,000",
        "cashier": "2,000,000",
        "discrepancy": "-"
      },
      {
        "time": "15h00",
        "system": "2,350,000",
        "cashier": "2,350,000",
        "discrepancy": "-"
      }
    ],
    "stock_check": [
      {
        "id": 1,
        "code": "61415-00VU",
        "name": "Kem gội Tofu - 400g",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 2,
        "code": "61007-00VU",
        "name": "Kem dưỡng da tay Sweet Wild Orange - 100g",
        "system": "28",
        "actual": "28",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 3,
        "code": "5967-00VU",
        "name": "Dầu gội Big - 640g",
        "system": "9",
        "actual": "9",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 4,
        "code": "60539-00VU",
        "name": "Dầu xả dưỡng tóc Glory Conditioner - 450g",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 5,
        "code": "62178-00VU",
        "name": "Dầu xả dưỡng tóc Violet Cream - 450g",
        "system": "7",
        "actual": "7",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 6,
        "code": "2145-02VU",
        "name": "Kem dưỡng thể Karma Kream - 225g",
        "system": "10",
        "actual": "10",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 7,
        "code": "0276-01VU",
        "name": "Kem dưỡng ẩm Enzymion - 45g",
        "system": "2",
        "actual": "2",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 8,
        "code": "3832-01VU",
        "name": "Kem dưỡng đặc trị cho tóc và da đầu Balance - 225g",
        "system": "7",
        "actual": "7",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 9,
        "code": "64600-00VU",
        "name": "Dầu gội Super Milk - 490g",
        "system": "12",
        "actual": "12",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 10,
        "code": "4429-00VU",
        "name": "Bom tựm Minions - 170g",
        "system": "20",
        "actual": "20",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 11,
        "code": "6826-00VU",
        "name": "Sữa tắm Rose Jam (Tự bảo quản) - 500g",
        "system": "23",
        "actual": "23",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 12,
        "code": "60865-01VU",
        "name": "Sữa tắm Good Karma...Everybody Needs Some - 540g",
        "system": "26",
        "actual": "26",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 13,
        "code": "60802-00VU",
        "name": "Kem tạo kiểu tóc Infra Wig - 100g",
        "system": "4",
        "actual": "4",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 14,
        "code": "61780-00VU",
        "name": "Dầu xả dưỡng tóc American Cream - 475g",
        "system": "12",
        "actual": "12",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 15,
        "code": "7014-00VU",
        "name": "Sữa tắm Dirty Springwash - 280g",
        "system": "28",
        "actual": "28",
        "gap": "0",
        "remark": ""
      }
    ],
    "comment": {
      "green": "Nhân viên tư vấn tốt và link sale tốt, nắm vững kiến thức sản phẩm. Cửa hàng vận hành tốt. Kho hàng sạch sẽ.",
      "red": "Một số tester chưa đúng quy định và chưa thay tester mới. Một vài tester chưa được vệ sinh sạch. Còn bụi ở các kệ trưng bày.",
      "remark": ""
    }
  },
  "SGCT": {
    "metadata": {
      "store": "Lush Saigon Center",
      "visitDate": "6/29/2026",
      "visitTime": "13h30",
      "staffOnDuty": "4"
    },
    "kpi": {
      "staff": "Staff",
      "vmd": "VMD",
      "storeroom": "Storeroom",
      "tester": "Tester",
      "stock": "Stock"
    },
    "vm": {
      "total": "43",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Nhìn chung, tổng quan shop, sàn nhà có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Khu vực kệ trưng bày bath bomb/bubble bars có sạch sẽ không?",
          "score": "2"
        },
        {
          "id": 3,
          "question": "Tất cả sản phẩm phải không có bụi, đặc biệt là các sản phẩm không bao bì.",
          "score": "2"
        },
        {
          "id": 4,
          "question": "Tất cả các kệ trưng bày không có bụi, đặc biệt là các kệ đen",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Các vật trang trí nhỏ chậu cây, bình hoa có được vệ sinh thường xuyên và đặt đúng vị trí chưa?",
          "score": "3"
        },
        {
          "id": 6,
          "question": "Các bước trong routine đã được sắp xếp hợp lý để dễ dàng liên kết với việc bán hàng chưa?",
          "score": "3"
        },
        {
          "id": 7,
          "question": "Các sản phẩm bán chạy nhất đã được trưng bày theo bố cục tam giác, với màu sắc phối hợp theo bánh xe màu chưa?",
          "score": "3"
        },
        {
          "id": 8,
          "question": "Các thiết bị cần sửa chữa tại cửa hàng đã được báo cáo chưa?",
          "score": "3"
        },
        {
          "id": 9,
          "question": "Đảm bảo tất cả TV luôn được bật và phát đúng nội dung video hàng tháng.",
          "score": "3"
        },
        {
          "id": 10,
          "question": "Đảm bảo các sản phẩm gần hết hạn luôn được trưng bày theo nguyên tắc FIFO, đồng thời tránh hoặc giảm thiểu việc trưng bày các sản phẩm còn hạn sử dụng quá xa.",
          "score": "3"
        },
        {
          "id": 11,
          "question": "Các hộp quà Knot Wrap đã được gói theo đúng hướng dẫn của LUSH chưa?",
          "score": "3"
        },
        {
          "id": 12,
          "question": "Các sản phẩm push sale tại quầy thu ngân đã được lựa chọn phù hợp chưa?",
          "score": "3"
        },
        {
          "id": 13,
          "question": "Tất cả bảng thông tin và giá sản phẩm cần thiết đã được trưng bày đầy đủ bằng font chữ Lush để đảm bảo truyền đạt thông tin rõ ràng và đầy đủ đến khách hàng chưa?",
          "score": "3"
        },
        {
          "id": 14,
          "question": "Thau bột, bàn FFM có ready chưa?",
          "score": "3"
        },
        {
          "id": 15,
          "question": "Bồn nước, bồn rửa tay có sạch sẽ chưa?",
          "score": "3"
        }
      ]
    },
    "storeroom": {
      "total": "14",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Nhìn chung, kho hàng có sạch sẽ không?",
          "score": "2"
        },
        {
          "id": 2,
          "question": "Tất cả các thùng không sử dụng đã được niêm phong và dán nhãn bằng giấy A4 bên ngoài, thể hiện tên sản phẩm và số lượng chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Các sản phẩm đã được đặt đúng khu vực quy định trong kho chưa?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Đã thiết lập khu vực riêng cho chai tester rỗng, văn phòng phẩm và sản phẩm vệ sinh chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Sản phẩm bulk nên được lưu trữ trong thùng carton lớn theo nguyên tắc sau: sản phẩm nhẹ đặt phía trên, sản phẩm nặng đặt phía dưới, hàng cũ đặt phía trước, hàng mới đặt phía sau, và các sản phẩm chưa sử dụng đặt sâu nhất bên trong.",
          "score": "3"
        }
      ]
    },
    "tester": {
      "total": "13",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Cửa hàng có cập nhật file nhập - xuất tester thường xuyên không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tất cả tester đã được dán nhãn tester, đóng dấu, ký xác nhận và ghi ngày bắt đầu sử dụng chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Tất cả tester bị rơi/vỡ đã được thu hồi chưa? Nếu chưa, chúng có đang được thu gom và đặt đúng khu vực/tủ lưu trữ quy định không?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Tester có được vệ sinh sạch sẽ chưa?",
          "score": "2"
        },
        {
          "id": 5,
          "question": "Tất cả sản phẩm phải có tester, trong đó các sản phẩm bán chạy cần còn ít nhất 1/3 dung lượng và các sản phẩm bán chậm cần còn ít nhất 1/2 dung lượng.",
          "score": "2"
        }
      ]
    },
    "staff": {
      "total": "15",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Đồng phục đúng guideline chưa?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tóc/ Makeup/ Bảng tên đúng chuẩn chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Thái độ tư vấn, tiếp cận khách hàng có đúng chuẩn chưa?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Có nắm vững kiến thức sản phẩm và link sale đúng chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Đồ dùng cá nhân đặt trong kho có đúng quy định và gọn gàng chưa?",
          "score": "3"
        }
      ]
    },
    "payment": [
      {
        "col0": "6/29/2026",
        "col1": "-",
        "col2": "3,325,000",
        "col3": "3,325,000"
      },
      {
        "col0": "",
        "col1": "NA",
        "col2": "NA",
        "col3": "NA"
      }
    ],
    "petty_cash": [
      {
        "time": "15h00",
        "system": "2,000,000",
        "cashier": "2,000,000",
        "discrepancy": "-"
      },
      {
        "time": "15h00",
        "system": "2,350,000",
        "cashier": "2,350,000",
        "discrepancy": "-"
      }
    ],
    "stock_check": [
      {
        "id": 1,
        "code": "61415-00VU",
        "name": "Kem gội Tofu - 400g",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 2,
        "code": "61007-00VU",
        "name": "Kem dưỡng da tay Sweet Wild Orange - 100g",
        "system": "28",
        "actual": "28",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 3,
        "code": "5967-00VU",
        "name": "Dầu gội Big - 640g",
        "system": "9",
        "actual": "9",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 4,
        "code": "60539-00VU",
        "name": "Dầu xả dưỡng tóc Glory Conditioner - 450g",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 5,
        "code": "62178-00VU",
        "name": "Dầu xả dưỡng tóc Violet Cream - 450g",
        "system": "7",
        "actual": "7",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 6,
        "code": "2145-02VU",
        "name": "Kem dưỡng thể Karma Kream - 225g",
        "system": "10",
        "actual": "10",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 7,
        "code": "0276-01VU",
        "name": "Kem dưỡng ẩm Enzymion - 45g",
        "system": "2",
        "actual": "2",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 8,
        "code": "3832-01VU",
        "name": "Kem dưỡng đặc trị cho tóc và da đầu Balance - 225g",
        "system": "7",
        "actual": "7",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 9,
        "code": "64600-00VU",
        "name": "Dầu gội Super Milk - 490g",
        "system": "12",
        "actual": "12",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 10,
        "code": "4429-00VU",
        "name": "Bom tựm Minions - 170g",
        "system": "20",
        "actual": "20",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 11,
        "code": "6826-00VU",
        "name": "Sữa tắm Rose Jam (Tự bảo quản) - 500g",
        "system": "23",
        "actual": "23",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 12,
        "code": "60865-01VU",
        "name": "Sữa tắm Good Karma...Everybody Needs Some - 540g",
        "system": "26",
        "actual": "26",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 13,
        "code": "60802-00VU",
        "name": "Kem tạo kiểu tóc Infra Wig - 100g",
        "system": "4",
        "actual": "4",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 14,
        "code": "61780-00VU",
        "name": "Dầu xả dưỡng tóc American Cream - 475g",
        "system": "12",
        "actual": "12",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 15,
        "code": "7014-00VU",
        "name": "Sữa tắm Dirty Springwash - 280g",
        "system": "28",
        "actual": "28",
        "gap": "0",
        "remark": ""
      }
    ],
    "comment": {
      "green": "Nhân viên tư vấn tốt và link sale tốt, nắm vững kiến thức sản phẩm. Cửa hàng vận hành tốt.",
      "red": "Một số tester chưa đúng quy định và chưa thay tester mới. Còn bụi ở các sản phẩm ở khu vực bath bomb/bubble bar. Cần chú ý sắp xếp lại các vật dụng trong kho.",
      "remark": ""
    }
  },
  "VCDK": {
    "metadata": {
      "store": "Lush Vincom Đồng Khởi",
      "visitDate": "6/30/2026",
      "visitTime": "13h30",
      "staffOnDuty": "5"
    },
    "kpi": {
      "staff": "Staff",
      "vmd": "VMD",
      "storeroom": "Storeroom",
      "tester": "Tester",
      "stock": "Stock"
    },
    "vm": {
      "total": "43",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Nhìn chung, tổng quan shop, sàn nhà có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Khu vực kệ trưng bày bath bomb/bubble bars có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Tất cả sản phẩm phải không có bụi, đặc biệt là các sản phẩm không bao bì.",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Tất cả các kệ trưng bày không có bụi, đặc biệt là các kệ đen",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Các vật trang trí nhỏ chậu cây, bình hoa có được vệ sinh thường xuyên và đặt đúng vị trí chưa?",
          "score": "3"
        },
        {
          "id": 6,
          "question": "Các bước trong routine đã được sắp xếp hợp lý để dễ dàng liên kết với việc bán hàng chưa?",
          "score": "3"
        },
        {
          "id": 7,
          "question": "Các sản phẩm bán chạy nhất đã được trưng bày theo bố cục tam giác, với màu sắc phối hợp theo bánh xe màu chưa?",
          "score": "3"
        },
        {
          "id": 8,
          "question": "Các thiết bị cần sửa chữa tại cửa hàng đã được báo cáo chưa?",
          "score": "3"
        },
        {
          "id": 9,
          "question": "Đảm bảo tất cả TV luôn được bật và phát đúng nội dung video hàng tháng.",
          "score": "3"
        },
        {
          "id": 10,
          "question": "Đảm bảo các sản phẩm gần hết hạn luôn được trưng bày theo nguyên tắc FIFO, đồng thời tránh hoặc giảm thiểu việc trưng bày các sản phẩm còn hạn sử dụng quá xa.",
          "score": "3"
        },
        {
          "id": 11,
          "question": "Các hộp quà Knot Wrap đã được gói theo đúng hướng dẫn của LUSH chưa?",
          "score": "3"
        },
        {
          "id": 12,
          "question": "Các sản phẩm push sale tại quầy thu ngân đã được lựa chọn phù hợp chưa?",
          "score": "3"
        },
        {
          "id": 13,
          "question": "Tất cả bảng thông tin và giá sản phẩm cần thiết đã được trưng bày đầy đủ bằng font chữ Lush để đảm bảo truyền đạt thông tin rõ ràng và đầy đủ đến khách hàng chưa?",
          "score": "2"
        },
        {
          "id": 14,
          "question": "Thau bột, bàn FFM có ready chưa?",
          "score": "2"
        },
        {
          "id": 15,
          "question": "Bồn nước, bồn rửa tay có sạch sẽ chưa?",
          "score": "3"
        }
      ]
    },
    "storeroom": {
      "total": "15",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Nhìn chung, kho hàng có sạch sẽ không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tất cả các thùng không sử dụng đã được niêm phong và dán nhãn bằng giấy A4 bên ngoài, thể hiện tên sản phẩm và số lượng chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Các sản phẩm đã được đặt đúng khu vực quy định trong kho chưa?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Đã thiết lập khu vực riêng cho chai tester rỗng, văn phòng phẩm và sản phẩm vệ sinh chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Sản phẩm bulk nên được lưu trữ trong thùng carton lớn theo nguyên tắc sau: sản phẩm nhẹ đặt phía trên, sản phẩm nặng đặt phía dưới, hàng cũ đặt phía trước, hàng mới đặt phía sau, và các sản phẩm chưa sử dụng đặt sâu nhất bên trong.",
          "score": "3"
        }
      ]
    },
    "tester": {
      "total": "14",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Cửa hàng có cập nhật file nhập - xuất tester thường xuyên không?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tất cả tester đã được dán nhãn tester, đóng dấu, ký xác nhận và ghi ngày bắt đầu sử dụng chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Tất cả tester bị rơi/vỡ đã được thu hồi chưa? Nếu chưa, chúng có đang được thu gom và đặt đúng khu vực/tủ lưu trữ quy định không?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Tester có được vệ sinh sạch sẽ chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Tất cả sản phẩm phải có tester, trong đó các sản phẩm bán chạy cần còn ít nhất 1/3 dung lượng và các sản phẩm bán chậm cần còn ít nhất 1/2 dung lượng.",
          "score": "2"
        }
      ]
    },
    "staff": {
      "total": "15",
      "grade": "Good",
      "items": [
        {
          "id": 1,
          "question": "Đồng phục đúng guideline chưa?",
          "score": "3"
        },
        {
          "id": 2,
          "question": "Tóc/ Makeup/ Bảng tên đúng chuẩn chưa?",
          "score": "3"
        },
        {
          "id": 3,
          "question": "Thái độ tư vấn, tiếp cận khách hàng có đúng chuẩn chưa?",
          "score": "3"
        },
        {
          "id": 4,
          "question": "Có nắm vững kiến thức sản phẩm và link sale đúng chưa?",
          "score": "3"
        },
        {
          "id": 5,
          "question": "Đồ dùng cá nhân đặt trong kho có đúng quy định và gọn gàng chưa?",
          "score": "3"
        }
      ]
    },
    "payment": [
      {
        "col0": "6/29/2026",
        "col1": "6,102,000",
        "col2": "4,305,000",
        "col3": "(1,797,000)"
      },
      {
        "col0": "",
        "col1": "NA",
        "col2": "NA",
        "col3": "NA"
      }
    ],
    "petty_cash": [
      {
        "time": "15h00",
        "system": "195,000",
        "cashier": "195,000",
        "discrepancy": "-"
      },
      {
        "time": "15h00",
        "system": "748,000",
        "cashier": "748,000",
        "discrepancy": "-"
      }
    ],
    "stock_check": [
      {
        "id": 1,
        "code": "63236-00VU",
        "name": "Dầu xả dưỡng tóc Candy Rain - 450g",
        "system": "11",
        "actual": "11",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 2,
        "code": "64758GVN",
        "name": "X?t thểm toàn thân Super Milk - 50ml",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 3,
        "code": "64936-00VU",
        "name": "D?u dưỡng tóc và râu Dirty - 30ml",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 4,
        "code": "63256-00VU",
        "name": "Kem ?ánh r?ng Plaque Sabbath - 60g",
        "system": "12",
        "actual": "12",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 5,
        "code": "4691-00VU",
        "name": "Bom tựm Up, Up And Away - 90g",
        "system": "8",
        "actual": "8",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 6,
        "code": "64603-00VU",
        "name": "Dầu xả dưỡng tóc Super Milk - 230g",
        "system": "16",
        "actual": "16",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 7,
        "code": "63233-00VU",
        "name": "Dầu xả dưỡng tóc Valkyrie - 450g",
        "system": "1",
        "actual": "1",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 8,
        "code": "64040-00VU",
        "name": "M?t n? Beauty Sleep - 315g",
        "system": "1",
        "actual": "1",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 9,
        "code": "4934-00VU",
        "name": "Viên ngâm chân Put The Boot In - 115g",
        "system": "4",
        "actual": "4",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 10,
        "code": "63798-00VU",
        "name": "Kem dưỡng thể Super Fairy - 225g",
        "system": "3",
        "actual": "3",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 11,
        "code": "63183-00VU",
        "name": "Kem r?a m?t Mostly - 225g",
        "system": "14",
        "actual": "14",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 12,
        "code": "63148VN",
        "name": "X?t thểm toàn thân Sticky Dates - 200g",
        "system": "11",
        "actual": "11",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 13,
        "code": "63164-00VU",
        "name": "B? dưỡng thể Braziliant - 225g",
        "system": "11",
        "actual": "11",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 14,
        "code": "62549-00VU",
        "name": "Dầu gội Swell - 300g",
        "system": "4",
        "actual": "4",
        "gap": "0",
        "remark": ""
      },
      {
        "id": 15,
        "code": "3382-01VU",
        "name": "Kem dưỡng thể Karma Kream - 100g",
        "system": "3",
        "actual": "3",
        "gap": "0",
        "remark": ""
      }
    ],
    "comment": {
      "green": "Vận hành cửa hàng tốt. Nhân sự nắm vững kiến thức sản phẩm, tư vấn nhiệt tình và link sale tốt. Kho dọn sạch sẽ và cây trang trí đã được chăm sóc tốt hơn.",
      "red": "Một số kệ vẫn còn bụi bẩn. Một vài tester vẫn chưa đúng quy chuẩn.",
      "remark": ""
    }
  }
}
    }
  }
};
