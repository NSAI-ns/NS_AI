// =========================================================================
// MODULE 1: TRẮC NGHIỆM TÌNH HUỐNG THỰC TẾ THEO TỪNG NGÀNH
// Học sinh chọn ngành → trả lời 1 câu hỏi tình huống → nhận phân tích độ phù hợp
// =========================================================================

// 24 kịch bản tình huống, khớp 1-1 với 24 nhóm ngành trong career_insights.js
const CAREER_QUIZ_SCENARIOS = {
  'Công nghệ thông tin & Lập trình phần mềm': {
    question: 'Đêm trước ngày bảo vệ đồ án, ứng dụng đặt vé do nhóm bạn làm bất ngờ sập vì quá tải, trong khi 5.000 khách đang chờ mua vé. Bạn sẽ làm gì đầu tiên?',
    options: {
      A: {
        text: 'Mở log hệ thống, tìm đúng chỗ nghẽn (bộ nhớ, truy vấn, hay vòng lặp) rồi sửa tận gốc.',
        fit: 96,
        style: 'Tư duy hệ thống & sửa gốc vấn đề',
        why: 'Bạn phản xạ đúng như một kỹ sư phần mềm thật: đo trước, sửa sau, không đoán mò.'
      },
      B: {
        text: 'Tắt bớt các tính năng phụ, dồn toàn bộ máy chủ cho phần thanh toán để giữ được đơn hàng.',
        fit: 88,
        style: 'Thực dụng & ưu tiên sống còn',
        why: 'Rất hợp với vai trò kỹ sư sản phẩm — biết hy sinh phần phụ để giữ phần cốt lõi.'
      },
      C: {
        text: 'Báo bảo trì khẩn cấp, xin lỗi khách và huy động cả nhóm kiểm tra lại từ đầu cho chắc.',
        fit: 74,
        style: 'Cẩn trọng & minh bạch',
        why: 'An toàn, nhưng nghề này thường phải xử lý nhanh tại chỗ thay vì dừng hệ thống.'
      }
    }
  },

  'Khoa học máy tính & Trí tuệ nhân tạo (AI)': {
    question: 'Mô hình AI bạn huấn luyện đạt độ chính xác 95% trên tập dữ liệu thử, nhưng khi chạy thật với học sinh trong trường thì đoán sai liên tục. Bạn xử lý thế nào?',
    options: {
      A: {
        text: 'Đi tìm nguyên nhân: dữ liệu thật khác dữ liệu huấn luyện ở đâu, có thiên lệch (bias) gì không.',
        fit: 97,
        style: 'Tư duy khoa học & truy vết dữ liệu',
        why: 'Đây chính là công việc hằng ngày của kỹ sư AI — 80% thời gian là hiểu dữ liệu, không phải viết code.'
      },
      B: {
        text: 'Thu thập thêm dữ liệu thật của học sinh rồi huấn luyện lại mô hình cho sát hơn.',
        fit: 90,
        style: 'Kiên trì & hướng cải tiến',
        why: 'Hướng đi đúng, chỉ là cần kiểm tra chất lượng dữ liệu trước khi đổ thêm vào.'
      },
      C: {
        text: 'Tạm hạ mức kỳ vọng xuống, chỉ dùng mô hình cho các trường hợp đơn giản và dễ đoán.',
        fit: 72,
        style: 'Thận trọng & quản trị rủi ro',
        why: 'Hợp với mảng triển khai sản phẩm AI, nhưng chưa chạm tới phần nghiên cứu cốt lõi.'
      }
    }
  },

  'Kinh tế / Quản trị kinh doanh & Marketing': {
    question: 'Chiến dịch quảng cáo cho dòng balo học sinh đã đạt 500.000 lượt xem nhưng chỉ có 3% người đặt hàng. Bạn làm gì tiếp?',
    options: {
      A: {
        text: 'Đọc lại bình luận của khách để tìm lý do thật sự khiến họ chưa mua, rồi sửa đúng chỗ đó.',
        fit: 96,
        style: 'Lắng nghe khách hàng & ra quyết định theo dữ liệu',
        why: 'Đúng bài: tìm "nỗi đau" của khách trước khi đổ thêm tiền quảng cáo.'
      },
      B: {
        text: 'Làm video đo lực chống gù thật, mời bác sĩ hoặc thầy cô trải nghiệm để tạo niềm tin.',
        fit: 91,
        style: 'Xây dựng niềm tin bằng bằng chứng',
        why: 'Rất mạnh ở mảng thương hiệu và nội dung — điểm cộng lớn cho ngành Marketing.'
      },
      C: {
        text: 'Giảm giá hoặc tặng quà để chốt đơn nhanh, giữ doanh số trong tuần này trước đã.',
        fit: 70,
        style: 'Chạy theo doanh số ngắn hạn',
        why: 'Có hiệu quả tức thì nhưng dễ bào mòn lợi nhuận và giá trị thương hiệu về lâu dài.'
      }
    }
  },

  'Tài chính - Ngân hàng & Kế toán - Kiểm toán': {
    question: 'Khi kiểm tra sổ sách cuối quý, bạn phát hiện một khoản chi 200 triệu không có chứng từ, và người ký duyệt là cấp trên trực tiếp của bạn. Bạn làm gì?',
    options: {
      A: {
        text: 'Ghi nhận vào biên bản kiểm tra, yêu cầu bổ sung chứng từ đúng quy định trước khi duyệt.',
        fit: 97,
        style: 'Nguyên tắc & tuân thủ chuẩn mực',
        why: 'Đây là tố chất bắt buộc của kế toán – kiểm toán: số liệu phải có căn cứ, không có ngoại lệ.'
      },
      B: {
        text: 'Hỏi thẳng cấp trên để hiểu bối cảnh, đồng thời ghi chú lại để theo dõi ở kỳ sau.',
        fit: 86,
        style: 'Khéo léo & quản trị quan hệ',
        why: 'Hợp với môi trường doanh nghiệp, nhưng nghề kiểm toán đòi hỏi cứng rắn hơn.'
      },
      C: {
        text: 'Bỏ qua vì cấp trên đã duyệt, tránh làm căng thẳng và giữ hòa khí trong phòng.',
        fit: 45,
        style: 'Ưu tiên hòa khí',
        why: 'Cách này gần như chắc chắn không hợp với ngành tài chính – kế toán.'
      }
    }
  },

  'Y khoa / Dược học & Khoa học sức khỏe': {
    question: 'Trong ca trực, một bệnh nhân đau bụng nhẹ nhưng liên tục đòi tiêm thuốc giảm đau mạnh. Chỉ số sinh tồn của bệnh nhân vẫn bình thường. Bạn xử lý thế nào?',
    options: {
      A: {
        text: 'Giải thích rõ vì sao chưa cần thuốc mạnh, theo dõi thêm diễn biến rồi mới quyết định.',
        fit: 97,
        style: 'Chuẩn mực y khoa & an toàn người bệnh',
        why: 'Đúng nguyên tắc "trước hết không gây hại" — tố chất số một của người làm y.'
      },
      B: {
        text: 'Hỏi kỹ tiền sử, khám lại kỹ hơn để chắc chắn không bỏ sót dấu hiệu nguy hiểm nào.',
        fit: 95,
        style: 'Cẩn trọng & chẩn đoán kỹ',
        why: 'Rất hợp với bác sĩ lâm sàng — sự kỹ lưỡng cứu được mạng người.'
      },
      C: {
        text: 'Cho thuốc theo yêu cầu để bệnh nhân dễ chịu và tránh phàn nàn.',
        fit: 38,
        style: 'Chiều theo yêu cầu',
        why: 'Nguy hiểm trong y khoa: thuốc mạnh có tác dụng phụ, không thể cho theo cảm tính.'
      }
    }
  },

  'Điều dưỡng & Kỹ thuật Y sinh': {
    question: 'Bạn chăm sóc một cụ ông 80 tuổi hay cáu gắt, liên tục từ chối hợp tác và đuổi bạn ra khỏi phòng. Bạn làm gì?',
    options: {
      A: {
        text: 'Kiên nhẫn ngồi lại trò chuyện, tìm hiểu vì sao cụ khó chịu rồi mới tiếp tục chăm sóc.',
        fit: 96,
        style: 'Kiên nhẫn & thấu cảm',
        why: 'Đây là kỹ năng sống còn của điều dưỡng — người bệnh khó tính thường đang đau hoặc sợ.'
      },
      B: {
        text: 'Nhờ người nhà hoặc đồng nghiệp có kinh nghiệm hơn phối hợp cùng mình.',
        fit: 88,
        style: 'Phối hợp & biết giới hạn',
        why: 'Rất thực tế, nhưng nghề này vẫn cần bạn tự xử lý được phần lớn tình huống.'
      },
      C: {
        text: 'Ghi nhận vào hồ sơ và chuyển ca cho người khác để tránh xung đột.',
        fit: 55,
        style: 'Né tránh xung đột',
        why: 'Hợp lý khi quá tải, nhưng nếu là phản xạ thường xuyên thì ngành này sẽ rất mệt.'
      }
    }
  },

  'Kỹ thuật / Cơ điện tử & Tự động hóa': {
    question: 'Dây chuyền tự động trong nhà máy dừng đột ngột, cả xưởng đứng chờ. Bạn là kỹ sư trực ca. Bước đầu tiên của bạn?',
    options: {
      A: {
        text: 'Đọc mã lỗi trên bảng điều khiển, đối chiếu sơ đồ mạch để khoanh vùng hỏng hóc.',
        fit: 97,
        style: 'Chẩn đoán có hệ thống',
        why: 'Đúng quy trình kỹ thuật: đo – đọc – khoanh vùng, không tháo tung máy ra đoán.'
      },
      B: {
        text: 'Cô lập khu vực nguy hiểm, đảm bảo an toàn cho người trước rồi mới sửa máy.',
        fit: 95,
        style: 'An toàn là ưu tiên số một',
        why: 'Tư duy này được các nhà máy săn đón nhất — an toàn đứng trên cả tiến độ.'
      },
      C: {
        text: 'Khởi động lại toàn bộ dây chuyền xem lỗi có tự hết không, sửa sau nếu vẫn lỗi.',
        fit: 62,
        style: 'Thử nhanh để chạy tiếp',
        why: 'Có thể cứu được ca sản xuất, nhưng dễ che mất lỗi gốc và gây hỏng nặng hơn.'
      }
    }
  },

  'Điện - Điện tử & Năng lượng tái tạo': {
    question: 'Bạn được giao lắp hệ pin mặt trời cho mái trường, nhưng chi phí vượt ngân sách 20%. Bạn xử lý ra sao?',
    options: {
      A: {
        text: 'Tính lại phương án kỹ thuật: chọn thiết bị tương đương, tối ưu số tấm pin mà vẫn đủ công suất.',
        fit: 96,
        style: 'Tối ưu kỹ thuật & bài toán chi phí',
        why: 'Kỹ sư giỏi là người giải được bài toán kỹ thuật trong giới hạn ngân sách.'
      },
      B: {
        text: 'Đề xuất chia dự án thành 2 giai đoạn, làm phần cốt lõi trước rồi bổ sung sau.',
        fit: 89,
        style: 'Quản lý dự án theo giai đoạn',
        why: 'Cách làm rất chuyên nghiệp, hợp với vai trò kỹ sư dự án.'
      },
      C: {
        text: 'Dùng thiết bị giá rẻ hơn để đủ tiền hoàn thành đúng hạn bàn giao.',
        fit: 55,
        style: 'Ưu tiên tiến độ',
        why: 'Rủi ro cao: thiết bị kém chất lượng sẽ hỏng sớm và tốn gấp nhiều lần để sửa.'
      }
    }
  },

  'Kiến trúc & Thiết kế nội thất': {
    question: 'Khách hàng muốn một ngôi nhà "thật nổi bật, khác người", nhưng diện tích đất rất nhỏ và ngân sách hạn chế. Bạn làm gì?',
    options: {
      A: {
        text: 'Vẽ phương án tận dụng ánh sáng, chiều cao và khoảng mở để tạo điểm nhấn mà không tốn kém.',
        fit: 97,
        style: 'Sáng tạo trong khuôn khổ',
        why: 'Đây chính là ranh giới giữa kiến trúc sư giỏi và người vẽ đẹp: sáng tạo có điều kiện.'
      },
      B: {
        text: 'Ngồi lại với khách, chỉ rõ điều gì khả thi và cùng thống nhất lại mục tiêu ưu tiên.',
        fit: 91,
        style: 'Làm rõ kỳ vọng & tư vấn',
        why: 'Kỹ năng giao tiếp và quản lý kỳ vọng khách hàng rất quan trọng trong nghề này.'
      },
      C: {
        text: 'Vẽ đúng như khách yêu cầu, phần chi phí để khách tự cân đối sau.',
        fit: 60,
        style: 'Chiều theo yêu cầu',
        why: 'Dễ dẫn đến bản vẽ không thi công được, mất uy tín của chính bạn.'
      }
    }
  },

  'Xây dựng & Quản lý dự án': {
    question: 'Công trình sắp tới hạn bàn giao, nhà thầu báo thiếu vật tư 5 ngày. Bạn là người quản lý dự án, bạn làm gì?',
    options: {
      A: {
        text: 'Lập lại tiến độ: dồn nguồn lực cho hạng mục găng, đẩy các phần chưa cần sang sau.',
        fit: 96,
        style: 'Quản trị tiến độ & nguồn lực',
        why: 'Đây là kỹ năng cốt lõi của quản lý dự án xây dựng.'
      },
      B: {
        text: 'Tìm nguồn vật tư thay thế tương đương chất lượng để không phải dừng công trình.',
        fit: 90,
        style: 'Xoay xở thực chiến',
        why: 'Rất hợp với môi trường công trường, miễn là vẫn kiểm soát được chất lượng.'
      },
      C: {
        text: 'Báo cáo cấp trên và chờ chỉ đạo vì đây là việc vượt thẩm quyền.',
        fit: 60,
        style: 'Thận trọng & đúng quy trình',
        why: 'Đúng về thủ tục nhưng nghề này cần người chủ động xử lý tại chỗ.'
      }
    }
  },

  'Nông nghiệp công nghệ cao & Công nghệ thực phẩm': {
    question: 'Vườn dưa lưới trong nhà kính bỗng vàng lá hàng loạt, chưa rõ nguyên nhân. Bạn làm gì trước?',
    options: {
      A: {
        text: 'Kiểm tra dữ liệu cảm biến độ ẩm, dinh dưỡng, nhiệt độ để tìm yếu tố bất thường.',
        fit: 96,
        style: 'Nông nghiệp dựa trên dữ liệu',
        why: 'Đúng tinh thần nông nghiệp công nghệ cao: quyết định dựa trên số đo, không dựa vào cảm giác.'
      },
      B: {
        text: 'Lấy mẫu đất và lá đem phân tích, đồng thời cách ly khu vực bị bệnh.',
        fit: 93,
        style: 'Khoa học & kiểm soát lây lan',
        why: 'Quy trình chuẩn, an toàn cho cả vườn.'
      },
      C: {
        text: 'Phun thuốc phòng bệnh ngay cho chắc, chữa được thì chữa không thì tính sau.',
        fit: 58,
        style: 'Xử lý nhanh theo kinh nghiệm',
        why: 'Dễ tốn tiền vô ích và để lại tồn dư thuốc — đi ngược yêu cầu của ngành này.'
      }
    }
  },

  'Môi trường & Khoa học bền vững': {
    question: 'Bạn phát hiện nước thải từ một nhà máy đổ ra con sông cạnh trường, nhưng nhà máy là nơi làm việc của nhiều phụ huynh trong xã. Bạn làm gì?',
    options: {
      A: {
        text: 'Lấy mẫu nước, ghi lại số liệu và báo cáo cơ quan chức năng theo đúng quy trình.',
        fit: 97,
        style: 'Dựa trên bằng chứng & đúng pháp luật',
        why: 'Đây là cách duy nhất vừa bảo vệ môi trường vừa bảo vệ chính bạn.'
      },
      B: {
        text: 'Đề xuất với nhà máy một giải pháp xử lý nước thải vừa túi tiền để họ tự sửa.',
        fit: 89,
        style: 'Thuyết phục & tìm giải pháp',
        why: 'Rất giá trị trong thực tế, hợp với hướng môi trường – cộng đồng.'
      },
      C: {
        text: 'Đăng lên mạng xã hội để gây áp lực dư luận cho nhanh.',
        fit: 50,
        style: 'Gây áp lực dư luận',
        why: 'Dễ phản tác dụng nếu chưa đủ bằng chứng, và không phải cách làm của người làm khoa học.'
      }
    }
  },

  'Luật / Ngoại giao & Khoa học xã hội': {
    question: 'Hai người hàng xóm tranh chấp mảnh đất, mỗi bên đều có giấy tờ riêng và đều cho mình đúng. Bạn được nhờ tư vấn. Bạn bắt đầu từ đâu?',
    options: {
      A: {
        text: 'Rà soát thứ tự pháp lý của từng giấy tờ: thời điểm, thủ tục, hiệu lực theo luật đất đai.',
        fit: 97,
        style: 'Tư duy pháp lý & phân tích chứng cứ',
        why: 'Đúng cách một người làm luật xử lý việc: bám vào quy định và thứ tự hiệu lực.'
      },
      B: {
        text: 'Nghe trọn vẹn cả hai bên rồi đề xuất phương án hòa giải trước khi ra tòa.',
        fit: 90,
        style: 'Hòa giải & lắng nghe',
        why: 'Rất hợp với hướng tư vấn pháp lý và ngoại giao — giải quyết mà không cần thắng thua.'
      },
      C: {
        text: 'Nói rõ ai đúng ai sai ngay từ đầu để hai bên khỏi mất thời gian.',
        fit: 52,
        style: 'Kết luận nhanh',
        why: 'Trong pháp lý, kết luận trước khi đủ chứng cứ là sai nghề.'
      }
    }
  },

  'Công an & Quân đội': {
    question: 'Trong lúc tuần tra, bạn thấy một nhóm thanh niên tụ tập giữa đêm ở khu vực thường xảy ra trộm cắp. Bạn xử lý thế nào?',
    options: {
      A: {
        text: 'Quan sát, ghi nhận tình hình và gọi bổ sung lực lượng trước khi tiếp cận.',
        fit: 96,
        style: 'Đúng quy trình & an toàn',
        why: 'Đây là phản xạ chuẩn của lực lượng vũ trang: không hành động đơn lẻ khi chưa nắm tình hình.'
      },
      B: {
        text: 'Tiếp cận nhẹ nhàng, hỏi thăm và nhắc nhở rồi mời họ về nhà vì đã khuya.',
        fit: 88,
        style: 'Mềm dẻo & dân vận',
        why: 'Rất hợp với công tác giữ gìn an ninh ở cơ sở, miễn vẫn đảm bảo an toàn.'
      },
      C: {
        text: 'Xông vào kiểm tra ngay để thể hiện sự quyết liệt, tránh để chúng chạy mất.',
        fit: 55,
        style: 'Quyết liệt nhưng rủi ro',
        why: 'Dễ gây nguy hiểm cho bản thân và vi phạm quy trình tác chiến.'
      }
    }
  },

  'Sư phạm & Quản lý giáo dục': {
    question: 'Một học sinh giỏi bỗng sút hẳn, không làm bài, ánh mắt lảng tránh mỗi khi bạn hỏi. Bạn làm gì?',
    options: {
      A: {
        text: 'Tìm dịp riêng tư để trò chuyện nhẹ nhàng, không phán xét, chỉ để em được nói ra.',
        fit: 97,
        style: 'Thấu cảm & tạo an toàn tâm lý',
        why: 'Đây là tố chất của giáo viên được học sinh tin tưởng nhất.'
      },
      B: {
        text: 'Theo dõi thêm vài tuần, ghi nhận biểu hiện rồi phối hợp với phụ huynh và giáo viên chủ nhiệm.',
        fit: 90,
        style: 'Phối hợp & quan sát có hệ thống',
        why: 'Cần thiết, nhưng đôi khi chờ lâu sẽ làm em mất điểm tựa đúng lúc.'
      },
      C: {
        text: 'Nhắc nhở trước lớp về tinh thần học tập để em tự điều chỉnh.',
        fit: 45,
        style: 'Kỷ luật trước, thấu hiểu sau',
        why: 'Cách này thường làm học sinh khép lại hoàn toàn thay vì mở lòng.'
      }
    }
  },

  'Tâm lý học & Dịch vụ tham vấn / Xã hội': {
    question: 'Một bạn cùng lớp tâm sự với bạn rằng gần đây bạn ấy thấy mọi thứ vô nghĩa và không muốn làm gì nữa. Bạn phản ứng thế nào?',
    options: {
      A: {
        text: 'Lắng nghe hết, không vội khuyên, rồi hỏi bạn ấy có muốn tìm đến người có chuyên môn không.',
        fit: 98,
        style: 'Lắng nghe không phán xét & chuyển tuyến đúng',
        why: 'Đúng nguyên tắc tham vấn: không tự chữa, biết chuyển đúng người.'
      },
      B: {
        text: 'Ở bên bạn ấy, hỏi thăm mỗi ngày và cùng làm những việc nhỏ để bạn ấy đỡ cô đơn.',
        fit: 92,
        style: 'Đồng hành bền bỉ',
        why: 'Sự hiện diện đều đặn có giá trị rất lớn, cần bổ sung thêm việc tìm chuyên gia.'
      },
      C: {
        text: 'Nói bạn ấy đừng suy nghĩ nhiều, cố lên là sẽ ổn thôi.',
        fit: 40,
        style: 'Động viên bằng câu nói suông',
        why: 'Lời động viên sáo rỗng thường làm người đang khủng hoảng cảm thấy bị bỏ rơi hơn.'
      }
    }
  },

  'Truyền thông / Báo chí & Quan hệ công chúng (PR)': {
    question: 'Một thông tin sai về sản phẩm của công ty bạn đang lan rất nhanh trên mạng. Bạn là người phụ trách truyền thông. Bạn làm gì trước?',
    options: {
      A: {
        text: 'Kiểm chứng nguồn tin và mức độ lan truyền, rồi phản hồi bằng dữ liệu thật, rõ ràng, đúng người.',
        fit: 97,
        style: 'Phản hồi dựa trên sự thật',
        why: 'Đây là quy trình xử lý khủng hoảng truyền thông chuẩn mực.'
      },
      B: {
        text: 'Viết một thông cáo ngắn, giọng điệu chân thành, đăng ngay trên kênh chính thức để trấn an.',
        fit: 89,
        style: 'Phản ứng nhanh & giữ kênh chính thức',
        why: 'Tốc độ rất quan trọng, chỉ cần đảm bảo thông tin đã được xác thực.'
      },
      C: {
        text: 'Im lặng chờ cho qua, vì càng nói càng bị chú ý.',
        fit: 42,
        style: 'Im lặng chờ qua',
        why: 'Trong truyền thông, im lặng gần như luôn khiến câu chuyện bị hiểu sai nhiều hơn.'
      }
    }
  },

  'Thiết kế đồ họa / Mỹ thuật số & Đa phương tiện': {
    question: 'Khách hàng yêu cầu chỉnh sửa logo đến lần thứ 8, mỗi lần theo một hướng khác hẳn nhau. Bạn xử lý thế nào?',
    options: {
      A: {
        text: 'Đưa khách xem lại bản brief ban đầu và cùng chốt rõ mục tiêu trước khi sửa tiếp.',
        fit: 96,
        style: 'Quản lý dự án & làm rõ yêu cầu',
        why: 'Kỹ năng này giúp bạn không bị "sửa vô hạn" — điều mà designer nào cũng phải học.'
      },
      B: {
        text: 'Sửa theo đúng yêu cầu từng lần, giữ thái độ vui vẻ để giữ khách lâu dài.',
        fit: 74,
        style: 'Chiều khách & giữ quan hệ',
        why: 'Giữ được khách nhưng dễ kiệt sức và bản thiết kế loãng dần.'
      },
      C: {
        text: 'Đề xuất 3 phương án mới tinh, mỗi phương án kèm lý do thiết kế rõ ràng.',
        fit: 90,
        style: 'Sáng tạo có lập luận',
        why: 'Rất mạnh về chuyên môn, hiệu quả khi khách còn đang mơ hồ về hướng đi.'
      }
    }
  },

  'Âm nhạc, Biểu diễn & Nghệ thuật sân khấu': {
    question: 'Ba ngày trước đêm diễn lớn, giọng bạn bị khản và bác sĩ khuyên nghỉ hoàn toàn. Bạn quyết định thế nào?',
    options: {
      A: {
        text: 'Giảm cường độ tập, điều chỉnh lại tiết mục cho phù hợp sức và giữ sức cho đêm chính.',
        fit: 95,
        style: 'Thích nghi & bảo vệ sức bền',
        why: 'Nghệ sĩ chuyên nghiệp là người biết tiết chế để đi đường dài.'
      },
      B: {
        text: 'Vẫn hát hết mình vì đây là cơ hội lớn, chấp nhận rủi ro.',
        fit: 68,
        style: 'Dấn thân vì đam mê',
        why: 'Rất giàu cảm xúc nhưng có thể làm tổn thương giọng vĩnh viễn.'
      },
      C: {
        text: 'Xin đổi sang vai trò khác trong đêm diễn: dẫn chương trình, hỗ trợ kỹ thuật, hậu trường.',
        fit: 88,
        style: 'Linh hoạt & vì tập thể',
        why: 'Rất chuyên nghiệp — sân khấu cần người hiểu cả phần sau cánh gà.'
      }
    }
  },

  'Thể thao & Khoa học vận động': {
    question: 'Vận động viên bạn huấn luyện đang chạy tốt nhưng bị đau nhẹ ở đầu gối, còn 2 tuần nữa là giải đấu. Bạn làm gì?',
    options: {
      A: {
        text: 'Cho giảm khối lượng, thay bài tập để giảm tải khớp và theo dõi phản ứng từng buổi.',
        fit: 96,
        style: 'Khoa học & quản lý tải tập',
        why: 'Đây là cách huấn luyện hiện đại: điều chỉnh tải thay vì ép hoặc bỏ hẳn.'
      },
      B: {
        text: 'Chuyển ngay sang bác sĩ/chuyên gia phục hồi để kiểm tra trước khi tập tiếp.',
        fit: 94,
        style: 'An toàn & chuyển tuyến đúng',
        why: 'Rất đúng khi chưa rõ nguyên nhân đau — sức khỏe dài hạn trên thành tích ngắn hạn.'
      },
      C: {
        text: 'Vẫn giữ nguyên giáo án vì giải đấu quan trọng, đau nhẹ thì sẽ tự hết.',
        fit: 50,
        style: 'Ưu tiên thành tích',
        why: 'Rủi ro chấn thương nặng, có thể chấm dứt sự nghiệp của vận động viên.'
      }
    }
  },

  'Du lịch / Quản trị khách sạn & Dịch vụ F&B': {
    question: 'Khách phàn nàn món ăn bị nguội và đòi gặp quản lý ngay giữa giờ cao điểm. Bạn đang là quản lý ca. Bạn làm gì?',
    options: {
      A: {
        text: 'Xin lỗi chân thành, đổi món ngay và đích thân theo dõi bàn đó đến khi khách hài lòng.',
        fit: 97,
        style: 'Dịch vụ tận tay & xử lý tại chỗ',
        why: 'Đây là chuẩn mực ngành khách sạn: khách phàn nàn đúng cách sẽ thành khách trung thành.'
      },
      B: {
        text: 'Giải thích là đang giờ cao điểm, hứa sẽ cải thiện và tặng kèm món tráng miệng.',
        fit: 82,
        style: 'Khéo léo nhưng còn lý do',
        why: 'Tốt hơn im lặng, nhưng giải thích lý do khi khách đang nóng thường không hiệu quả.'
      },
      C: {
        text: 'Gọi nhân viên phục vụ bàn đó ra xin lỗi khách, còn mình tiếp tục điều hành.',
        fit: 66,
        style: 'Phân quyền & giữ nhịp vận hành',
        why: 'Cần thiết khi quá tải, nhưng khách khó tính thường muốn gặp đúng người có trách nhiệm.'
      }
    }
  },

  'Ngôn ngữ học & Biên phiên dịch quốc tế': {
    question: 'Bạn phiên dịch trong buổi gặp gỡ giữa hai bên, và một bên nói câu mà dịch đúng từ ngữ sẽ khiến bên kia hiểu sai về văn hóa. Bạn làm gì?',
    options: {
      A: {
        text: 'Dịch đúng ý người nói nhưng chọn cách diễn đạt phù hợp văn hóa của người nghe.',
        fit: 97,
        style: 'Chuyển ngữ theo ngữ cảnh văn hóa',
        why: 'Đây là điểm khác biệt giữa máy dịch và phiên dịch viên thật.'
      },
      B: {
        text: 'Dịch sát từng từ rồi ghi chú thêm để cả hai bên cùng hiểu đúng.',
        fit: 85,
        style: 'Trung thành tuyệt đối với câu chữ',
        why: 'An toàn về nghĩa nhưng có thể làm câu chuyện bị khô và gián đoạn.'
      },
      C: {
        text: 'Dịch theo hướng có lợi hơn cho bên bạn đại diện để đàm phán thuận lợi.',
        fit: 40,
        style: 'Thiên vị khi chuyển ngữ',
        why: 'Vi phạm đạo đức nghề nghiệp — phiên dịch viên phải trung lập.'
      }
    }
  },

  'Logistics & Quản trị chuỗi cung ứng': {
    question: 'Một container hàng cho khách đang bị giữ ở cảng do thiếu một loại giấy tờ, trong khi hạn giao chỉ còn 4 ngày. Bạn làm gì?',
    options: {
      A: {
        text: 'Liên hệ hãng tàu và hải quan tìm phương án bổ sung giấy tờ trong ngày, đồng thời báo ngay cho khách.',
        fit: 96,
        style: 'Xử lý song song & minh bạch',
        why: 'Đúng cách dân logistics làm: vừa gỡ vướng vừa giữ khách hiểu tình hình.'
      },
      B: {
        text: 'Tìm tuyến vận tải khác (hàng không hoặc xe) cho lô hàng gấp để kịp hạn giao.',
        fit: 88,
        style: 'Linh hoạt phương thức vận tải',
        why: 'Rất sáng tạo nhưng chi phí tăng mạnh, cần tính toán trước khi chốt.'
      },
      C: {
        text: 'Chờ hải quan xử lý theo thứ tự, xin khách lùi hạn giao thêm vài ngày.',
        fit: 58,
        style: 'Theo quy trình & xin lùi hạn',
        why: 'Chấp nhận được khi hết cách, nhưng khách sẽ đánh giá thấp năng lực xử lý.'
      }
    }
  },

  'Hàng không & Hàng hải': {
    question: 'Chuyến bay của bạn bị hoãn 6 tiếng do thời tiết, 300 hành khách đang bức xúc tại cửa ra máy bay. Bạn là người điều phối. Bạn làm gì?',
    options: {
      A: {
        text: 'Thông báo lý do cụ thể, cập nhật giờ bay mỗi 30 phút và nhanh chóng hỗ trợ các trường hợp cần đổi chuyến.',
        fit: 96,
        style: 'Quản lý thông tin & hỗ trợ khẩn',
        why: 'Điều hành hàng không chuyên nghiệp là minh bạch và cập nhật đều, không im lặng.'
      },
      B: {
        text: 'Ưu tiên xử lý trước cho người già, trẻ nhỏ và khách có chuyến nối gấp.',
        fit: 93,
        style: 'Ưu tiên nhóm yếu thế & kết nối chuyến',
        why: 'Rất đúng tinh thần phục vụ, cần đi kèm thông báo rộng để khách khác hiểu.'
      },
      C: {
        text: 'Yêu cầu nhân viên tuyệt đối không giải thích gì để tránh khách so sánh, chờ chỉ đạo cấp trên.',
        fit: 45,
        style: 'Im lặng chờ chỉ đạo',
        why: 'Thiếu thông tin chính là thứ khiến đám đông bùng nổ nhanh nhất.'
      }
    }
  }
};

// Chuẩn hóa tên ngành để tra cứu kịch bản (bỏ qua khác biệt dấu câu)
function normalizeCareerKey(name) {
  return String(name || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function getQuizScenarioForCareer(careerName) {
  if (!careerName) return null;
  const target = normalizeCareerKey(careerName);
  for (const key of Object.keys(CAREER_QUIZ_SCENARIOS)) {
    if (normalizeCareerKey(key) === target) return CAREER_QUIZ_SCENARIOS[key];
  }
  // khớp mềm theo cụm từ chính
  for (const key of Object.keys(CAREER_QUIZ_SCENARIOS)) {
    const mainWord = normalizeCareerKey(key).split(/[\/&(]/)[0].trim();
    if (mainWord && target.includes(mainWord)) return CAREER_QUIZ_SCENARIOS[key];
  }
  return null;
}

// Lấy điểm 3 môn cốt lõi của ngành từ hồ sơ học sinh
function getCoreSubjectScores(careerName) {
  const scores = (typeof read === 'function') ? (read('scores') || {}) : {};
  const map = {
    'Công nghệ thông tin & Lập trình phần mềm': ['Toán', 'Tin học', 'Tiếng Anh'],
    'Khoa học máy tính & Trí tuệ nhân tạo (AI)': ['Toán', 'Tin học', 'Vật lý'],
    'Kinh tế / Quản trị kinh doanh & Marketing': ['Toán', 'Tiếng Anh', 'Ngữ văn'],
    'Tài chính - Ngân hàng & Kế toán - Kiểm toán': ['Toán', 'Tiếng Anh', 'Ngữ văn'],
    'Y khoa / Dược học & Khoa học sức khỏe': ['Sinh học', 'Hóa học', 'Toán'],
    'Điều dưỡng & Kỹ thuật Y sinh': ['Sinh học', 'Hóa học', 'Toán'],
    'Kỹ thuật / Cơ điện tử & Tự động hóa': ['Toán', 'Vật lý', 'Công nghệ công nghiệp'],
    'Điện - Điện tử & Năng lượng tái tạo': ['Toán', 'Vật lý', 'Công nghệ công nghiệp'],
    'Kiến trúc & Thiết kế nội thất': ['Toán', 'Mỹ thuật', 'Vật lý'],
    'Xây dựng & Quản lý dự án': ['Toán', 'Vật lý', 'Công nghệ công nghiệp'],
    'Nông nghiệp công nghệ cao & Công nghệ thực phẩm': ['Sinh học', 'Hóa học', 'Toán'],
    'Môi trường & Khoa học bền vững': ['Sinh học', 'Hóa học', 'Địa lý'],
    'Luật / Ngoại giao & Khoa học xã hội': ['Ngữ văn', 'Lịch sử', 'GDKT&PL'],
    'Công an & Quân đội': ['Toán', 'Ngữ văn', 'GDKT&PL'],
    'Sư phạm & Quản lý giáo dục': ['Ngữ văn', 'Toán', 'Tiếng Anh'],
    'Tâm lý học & Dịch vụ tham vấn / Xã hội': ['Ngữ văn', 'Sinh học', 'Lịch sử'],
    'Truyền thông / Báo chí & Quan hệ công chúng (PR)': ['Ngữ văn', 'Tiếng Anh', 'Lịch sử'],
    'Thiết kế đồ họa / Mỹ thuật số & Đa phương tiện': ['Mỹ thuật', 'Toán', 'Ngữ văn'],
    'Âm nhạc, Biểu diễn & Nghệ thuật sân khấu': ['Âm nhạc', 'Ngữ văn', 'Tiếng Anh'],
    'Thể thao & Khoa học vận động': ['Giáo dục thể chất', 'Sinh học', 'Toán'],
    'Du lịch / Quản trị khách sạn & Dịch vụ F&B': ['Tiếng Anh', 'Ngữ văn', 'Địa lý'],
    'Ngôn ngữ học & Biên phiên dịch quốc tế': ['Tiếng Anh', 'Ngữ văn', 'Lịch sử'],
    'Logistics & Quản trị chuỗi cung ứng': ['Toán', 'Tiếng Anh', 'Địa lý'],
    'Hàng không & Hàng hải': ['Toán', 'Vật lý', 'Tiếng Anh']
  };
  const subs = map[careerName] || ['Toán', 'Ngữ văn', 'Tiếng Anh'];
  return subs.map(s => {
    const raw = scores[s];
    const v = (raw === '' || raw == null || isNaN(Number(raw))) ? null : Number(raw);
    return { subject: s, score: v };
  });
}

// Sinh câu hỏi tình huống cho một ngành cụ thể
function buildCareerQuizPrompt(careerName, order) {
  const sc = getQuizScenarioForCareer(careerName);
  if (!sc) return null;
  const c = getChatContext();
  const core = getCoreSubjectScores(careerName);

  let out = `### 🎯 TÌNH HUỐNG THỰC TẾ: ${careerName}\n`;
  if (order) out += `*Tình huống ${order}/24 — trả lời bằng cách gõ **A**, **B** hoặc **C***\n\n`;

  out += `${sc.question}\n\n`;
  ['A', 'B', 'C'].forEach(l => {
    out += `• **${l}.** ${sc.options[l].text}\n`;
  });

  const known = core.filter(x => x.score !== null);
  if (known.length) {
    out += `\n📊 **Điểm của bạn ở các môn cốt lõi ngành này:** ` +
      known.map(x => `${x.subject} **${x.score}**`).join(' · ') +
      `\n👉 Sau khi bạn chọn đáp án, mình sẽ đối chiếu **độ phù hợp của đáp án** với **điểm 3 môn cốt lõi** này để nói rõ ngành này hợp đến đâu.\n`;
  } else {
    out += `\n💡 Bạn chưa nhập điểm ở Bước 2, nên mình sẽ chỉ đánh giá dựa trên **cách bạn xử lý tình huống**. Nhập thêm điểm thì phần đánh giá sẽ sát hơn.\n`;
  }

  chatState.activeQuiz = {
    career: careerName,
    scenario: sc,
    core: known
  };
  return out;
}

// Chấm điểm lựa chọn của học sinh trong trắc nghiệm ngành
function evaluateCareerQuizChoice(choiceLetter) {
  const quiz = chatState.activeQuiz;
  if (!quiz) return null;
  const letter = String(choiceLetter || '').trim().toUpperCase();
  const opt = quiz.scenario.options[letter];
  if (!opt) return null;

  chatState.activeQuiz = null;
  const career = quiz.career;
  const core = quiz.core || [];

  // Tính điểm phù hợp tổng hợp: 70% phản xạ tình huống + 30% điểm học tập
  let academicPct = null;
  let academicLine = '';
  if (core.length) {
    const vals = core.map(x => x.score);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    academicPct = Math.round(Math.min(100, Math.max(0, avg / 10 * 100)));
    const weakest = core.slice().sort((a, b) => a.score - b.score)[0];
    academicLine = `• **Điểm 3 môn cốt lõi:** ${core.map(x => `${x.subject} ${x.score}`).join(' · ')} → trung bình **${avg.toFixed(1)}/10** (quy đổi **${academicPct}%**).\n`;
    if (weakest && weakest.score < 6.5) {
      academicLine += `• ⚠️ Môn yếu nhất là **${weakest.subject} (${weakest.score})** — đây là môn "xương sống" của ngành, cần cải thiện trước khi nộp nguyện vọng.\n`;
    }
  }

  let overall;
  if (academicPct === null) {
    overall = opt.fit;
  } else {
    overall = Math.round(opt.fit * 0.7 + academicPct * 0.3);
  }

  let verdict, verdictNote;
  if (overall >= 88) {
    verdict = 'RẤT PHÙ HỢP';
    verdictNote = 'Cả cách bạn xử lý tình huống lẫn nền học tập đều đang đi đúng hướng của ngành này.';
  } else if (overall >= 75) {
    verdict = 'PHÙ HỢP';
    verdictNote = 'Bạn có tố chất của ngành. Chỉ cần siết lại môn còn yếu là ổn.';
  } else if (overall >= 60) {
    verdict = 'CẦN CÂN NHẮC';
    verdictNote = 'Bạn làm được, nhưng sẽ phải nỗ lực nhiều hơn mức trung bình ở ngành này.';
  } else {
    verdict = 'CHƯA PHÙ HỢP';
    verdictNote = 'Cách bạn phản xạ đang lệch với yêu cầu cốt lõi của nghề. Nên xem thêm ngành gần kề.';
  }

  const others = ['A', 'B', 'C'].filter(l => l !== letter)
    .map(l => `• Nếu chọn **${l}**: hợp hơn với kiểu người *${quiz.scenario.options[l].style}* (độ phù hợp **${quiz.scenario.options[l].fit}%**).`)
    .join('\n');

  return `### 🎯 KẾT QUẢ: ${career}\n\n` +
    `**Bạn chọn ${letter}** — ${opt.style}\n\n` +
    `📊 **Độ phù hợp với ngành: ${overall}% — ${verdict}**\n` +
    `• Phản xạ tình huống: **${opt.fit}%**\n` +
    academicLine +
    `• Đánh giá: ${opt.why}\n` +
    `• Kết luận: ${verdictNote}\n\n` +
    `🔍 **So sánh với các lựa chọn khác:**\n${others}\n\n` +
    `---\n` +
    `Bạn muốn thử tình huống của ngành khác, hay xem chi tiết ngành **${career}** (khối xét tuyển, trường, học gì, mức lương)?`;
}
