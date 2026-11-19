/**
 * ============================================================================
 * NS AI — BỘ DỮ LIỆU TRI THỨC NGHỀ NGHIỆP DÙNG CHUNG (CAREER INSIGHTS DATA)
 * Cung cấp thông tin chuẩn hóa 5 khối cho 24 nhóm ngành đào tạo chính quy:
 *   1. Khối xét tuyển & Cảnh báo môn học cốt lõi
 *   2. Trường đào tạo thế mạnh & Lời khuyên đề án tuyển sinh
 *   3. Bản chất đào tạo, tiến trình năm học, công cụ thực tế & kỹ năng trọng tâm
 *   4. Cái giá phải trả (Đúng 3 áp lực / mặt trái thực tế không né tránh)
 *   5. Mức lương tham khảo (Mới ra trường vs Sau 5-8 năm) & Hệ số tăng trưởng
 *
 * Tương thích 100% giữa Giao diện Kết quả (UI) và Chatbot Hướng nghiệp (NS AI).
 * Gán vào window.CAREER_INSIGHTS_DATA để tương thích với chế độ chạy trực tiếp file://.
 * ============================================================================
 */

(function () {
    'use strict';

    const CAREER_INSIGHTS = {
        "Công nghệ thông tin & Lập trình phần mềm": {
            id: "cntt",
            name: "Công nghệ thông tin & Lập trình phần mềm",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên xét tuyển quốc tế", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số trường ĐH mở rộng", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp dự phòng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên xét tuyển quốc tế", isPopular: true },
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số trường", isPopular: false },
                { combo: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp dự phòng", isPopular: false }
            ],
            coreSubjectWarning: "Toán học & Tư duy logic — Chương trình học sử dụng Toán cao cấp, Giải thuật và Cấu trúc dữ liệu rất nặng. Bắt buộc rèn luyện tư duy logic mỗi ngày.",
            coreSubjectAlert: {
                subject: "Toán học (Tư duy logic & Giải thuật)",
                reason: "Chương trình đại học học sâu về Toán rời rạc, Giải thuật và Cấu trúc dữ liệu. Sợ Toán sẽ rất chật vật khi học lập trình nâng cao."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Ưu tiên trường có điểm chuẩn các năm trước thấp hơn điểm thi thử của bạn từ 1.0 – 1.5 điểm để an toàn nguyện vọng.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Mỗi trường mỗi khác về chứng chỉ ngoại ngữ quy đổi (IELTS, TOEFL), tiêu chí phụ xét môn Toán và chỉ tiêu theo ĐGNL."
            },
            curriculum: {
                duration: "4 – 4.5 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Nhập môn", desc: "Toán cao cấp, Nhập môn lập trình (C/C++), Tiếng Anh chuyên ngành." },
                    { year: "Năm 2", stage: "Cơ sở ngành & Công cụ", desc: "Cấu trúc dữ liệu & Giải thuật, OOP, Cơ sở dữ liệu SQL, Mạng máy tính." },
                    { year: "Năm 3", stage: "Chuyên sâu & Đồ án", desc: "Phát triển Web/Mobile, Kiến trúc phần mềm, DevOps, Đồ án nhóm." },
                    { year: "Năm 4-5", stage: "Thực tập & Khóa luận", desc: "Thực tập doanh nghiệp (OJT 6 tháng), Khóa luận tốt nghiệp và đi làm." }
                ],
                plainExplanation: "Không chỉ là gõ code đơn thuần mà là xây dựng giải pháp công nghệ: thiết kế web/app, quản trị dữ liệu lớn, bảo mật hệ thống và tự động hóa quy trình vận hành.",
                tools: ["VS Code", "Git/GitHub", "Python", "JavaScript/TypeScript", "Docker", "PostgreSQL", "React/Node.js", "Postman"],
                skills: [
                    { icon: "🧩", name: "Tư duy giải thuật & Tối ưu", desc: "Phân tích và biến bài toán đời thực thành các thuật toán xử lý tối ưu" },
                    { icon: "💻", name: "Lập trình & Clean Code", desc: "Viết mã nguồn chuẩn mực, dễ đọc, dễ bảo trì và mở rộng" },
                    { icon: "🤝", name: "Làm việc nhóm Agile/Scrum", desc: "Phối hợp nhịp nhàng theo sprint, quản lý task trên Jira và review code" },
                    { icon: "🌐", name: "Tiếng Anh chuyên ngành", desc: "Tự đọc hiểu tài liệu kỹ thuật, cập nhật công nghệ mới trên StackOverflow/GitHub" }
                ]
            },
            harshRealities: [
                { icon: "⏰", title: "OT cày đêm fix bug & chạy dự án", desc: "Trước ngày release sản phẩm hoặc khi hệ thống gặp sự cố sập server, thức trắng đêm cùng team là chuyện bình thường." },
                { icon: "🔄", title: "Tốc độ đào thải cao — Tự học suốt đời", desc: "Công nghệ đổi mới sau mỗi 2–3 năm. Ngừng cập nhật 1 năm là tụt hậu so với lứa kỹ sư trẻ." },
                { icon: "🩺", title: "Bệnh văn phòng & Căng thẳng tinh thần", desc: "Ngồi liên tục 8–12 tiếng/ngày trước màn hình gây thoái hóa cột sống, cận thị, đau dạ dày và kiệt sức sáng tạo (burnout)." }
            ],
            salary: {
                entry: "9 – 15 Triệu / tháng",
                experienced: "30 – 50 Triệu / tháng",
                multiplier: "×3.2",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Lương kỹ sư làm cho doanh nghiệp nước ngoài hoặc thị trường remote quốc tế có thể lên đến $2,500 – $4,000/tháng.",
                entryBarPercent: 35,
                expBarPercent: 90
            },
            closingQuestion: "Bạn có sẵn sàng ngồi liên tục 4–5 tiếng trước màn hình máy tính chỉ để tìm và sửa một lỗi logic dòng lệnh nhỏ không?"
        },

        "Khoa học máy tính & Trí tuệ nhân tạo (AI)": {
            id: "cs_ai",
            name: "Khoa học máy tính & Trí tuệ nhân tạo (AI)",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên xét tuyển quốc tế", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số trường ĐH mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên xét tuyển quốc tế", isPopular: true },
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Toán cao cấp & Đại số tuyến tính — Nền tảng cốt lõi của Machine Learning và Deep Learning là Xác suất thống kê, Đại số tuyến tính và Giải tích đa biến.",
            coreSubjectAlert: {
                subject: "Toán cao cấp (Đại số tuyến tính & Xác suất)",
                reason: "Toàn bộ mô hình học sâu và mạng nơ-ron được xây dựng trên ma trận và đạo hàm. Không vững Toán thì chỉ dừng lại ở mức cài thư viện có sẵn."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Các ngành AI/KHMT tại trường top đầu lấy điểm cực cao (27-29đ). Hãy chuẩn bị nguyện vọng dự phòng ngành CNTT hoặc Hệ thống thông tin.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Ưu tiên điểm thi ĐGNL ĐHQG và chứng chỉ tiếng Anh (IELTS từ 6.5 trở lên) được quy đổi hệ số cao."
            },
            curriculum: {
                duration: "4 – 5 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Toán nâng cao", desc: "Đại số tuyến tính, Giải tích đa biến, Xác suất thống kê, Python căn bản." },
                    { year: "Năm 2", stage: "Cơ sở KHMT & Dữ liệu", desc: "Cấu trúc dữ liệu nâng cao, Toán rời rạc, Cơ sở dữ liệu NoSQL, Xử lý dữ liệu lớn." },
                    { year: "Năm 3", stage: "Chuyên sâu AI & Học máy", desc: "Machine Learning, Deep Learning, Xử lý ảnh số (CV), Xử lý ngôn ngữ tự nhiên (NLP)." },
                    { year: "Năm 4-5", stage: "Nghiên cứu & Khóa luận", desc: "Huấn luyện mô hình LLM/GenAI, Nghiên cứu R&D, Viết bài báo khoa học và thực tập." }
                ],
                plainExplanation: "Nghiên cứu cách dạy máy tính tự học và đưa ra quyết định thông minh: từ nhận diện giọng nói, thị giác máy tính, phân tích dữ liệu lớn đến phát triển mô hình AI tạo sinh.",
                tools: ["Python", "PyTorch", "TensorFlow", "Jupyter", "Scikit-Learn", "HuggingFace", "CUDA", "Pandas/NumPy"],
                skills: [
                    { icon: "🧠", name: "Toán mô hình & Đại số ma trận", desc: "Hiểu sâu bản chất toán học đằng sau các thuật toán tối ưu Gradient Descent" },
                    { icon: "🤖", name: "Huấn luyện mô hình Deep Learning", desc: "Thiết kế, tinh chỉnh (fine-tuning) và đánh giá các mô hình nơ-ron nhân tạo" },
                    { icon: "📊", name: "Khai phá dữ liệu lớn (Big Data)", desc: "Thu thập, làm sạch và trích xuất đặc trưng từ hàng triệu bản ghi dữ liệu" },
                    { icon: "🔬", name: "Tư duy nghiên cứu khoa học R&D", desc: "Đọc hiểu các bài báo ArXiv, thử nghiệm thuật toán mới và viết báo cáo khoa học" }
                ]
            },
            harshRealities: [
                { icon: "📈", title: "Nền tảng Toán học cực nặng & trừu tượng", desc: "Khối lượng lý thuyết toán giải tích, ma trận không gian đa chiều và thống kê rất khó, đòi hỏi tư duy trừu tượng cao độ." },
                { icon: "⚔️", title: "Cạnh tranh khốc liệt bằng công bố & năng lực R&D", desc: "Thị trường AI tuyển chọn rất gắt gao; bằng cử nhân thông thường khó cạnh tranh nếu không có bài báo nghiên cứu hoặc sản phẩm thực chiến xuất sắc." },
                { icon: "💥", title: "Rủi ro dự án R&D thất bại cao", desc: "Huấn luyện mô hình tốn hàng nghìn giờ GPU nhưng độ chính xác không đạt yêu cầu là điều xảy ra thường xuyên trong nghiên cứu." }
            ],
            salary: {
                entry: "12 – 20 Triệu / tháng",
                experienced: "45 – 80 Triệu / tháng",
                multiplier: "×3.8",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Kỹ sư AI / MLOps giỏi có thể nhận mức đãi ngộ trên 100 triệu/tháng tại các tập đoàn công nghệ lớn.",
                entryBarPercent: 40,
                expBarPercent: 95
            },
            closingQuestion: "Bạn có đam mê tìm hiểu sâu bản chất các công thức Toán học để biến chúng thành thuật toán thông minh không?"
        },

        "Kinh tế / Quản trị kinh doanh & Marketing": {
            id: "qtkd_mkt",
            name: "Kinh tế / Quản trị kinh doanh & Marketing",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất (75% chỉ tiêu)", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Nhiều trường ĐH Kinh tế", isPrimary: false },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Khối truyền thống", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Kinh tế", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Tiếng Anh & Toán tư duy số liệu — Ngành kinh doanh hiện đại vận hành bằng dữ liệu (Data-driven) và tài liệu tiếng Anh quốc tế.",
            coreSubjectAlert: {
                subject: "Tiếng Anh & Tư duy phân tích số liệu",
                reason: "Toàn bộ tài liệu tiếp thị số, báo cáo thị trường và case study quốc tế đều bằng tiếng Anh. Kém ngoại ngữ sẽ rất khó thăng tiến."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Các trường top 1 (Ngoại thương, NEU, UEH) có điểm chuẩn từ 26.5-28đ; nên cân nhắc thêm các trường công lập uy tín như Thương mại, HV Ngân hàng, HV Tài chính.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Chú ý phương thức xét tuyển kết hợp chứng chỉ IELTS với điểm học bạ hoặc điểm tốt nghiệp THPT."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Kinh tế vi mô", desc: "Kinh tế vi mô, vĩ mô, Pháp luật đại cương, Tiếng Anh thương mại." },
                    { year: "Năm 2", stage: "Cơ sở ngành & Marketing", desc: "Nguyên lý Marketing, Quản trị học, Hành vi người tiêu dùng, Nghiên cứu thị trường." },
                    { year: "Năm 3", stage: "Chuyên sâu & Chiến dịch", desc: "Digital Marketing, Quản trị chuỗi giá trị, Brand Management, Chạy chiến dịch giả lập." },
                    { year: "Năm 4", stage: "Thực tập & Khóa luận", desc: "Thực tập tại phòng Marketing/Sales doanh nghiệp, Đồ án kinh doanh tốt nghiệp." }
                ],
                plainExplanation: "Học cách phát hiện nhu cầu của thị trường, xây dựng sản phẩm/dịch vụ giải quyết nỗi đau khách hàng, lên chiến lược truyền thông và vận hành doanh nghiệp sinh lời.",
                tools: ["Excel nâng cao", "PowerBI", "Google Analytics", "Meta Ads Manager", "Canva", "HubSpot CRM", "TikTok Ads"],
                skills: [
                    { icon: "📊", name: "Phân tích số liệu thị trường", desc: "Đọc hiểu báo cáo nghiên cứu thị trường và đo lường chỉ số ROI chiến dịch" },
                    { icon: "🗣️", name: "Giao tiếp, thuyết phục & Bán hàng", desc: "Trình bày ý tưởng mạch lạc, đàm phán hợp đồng và xây dựng quan hệ đối tác" },
                    { icon: "🎯", name: "Hoạch định chiến lược đa kênh", desc: "Lập kế hoạch tiếp thị tổng thể từ kênh Online đến Offline (Omnichannel)" },
                    { icon: "📈", name: "Tư duy nhạy bén thương mại", desc: "Nhanh nhạy nắm bắt xu hướng thị trường và tâm lý tiêu dùng mới" }
                ]
            },
            harshRealities: [
                { icon: "🌊", title: "Bằng cấp dễ bão hòa nếu thiếu kinh nghiệm thực chiến", desc: "Số lượng cử nhân kinh tế tốt nghiệp mỗi năm rất đông; nhà tuyển dụng chỉ đánh giá cao ứng viên có kinh nghiệm làm dự án thực tế." },
                { icon: "🎯", title: "Áp lực chỉ tiêu doanh số (KPI) đè nặng mỗi tháng", desc: "Hiệu quả công việc được đo đếm trực tiếp bằng số lead, lượt click, doanh thu mang về; luôn bắt đầu lại từ con số 0 mỗi đầu tháng." },
                { icon: "⚡", title: "Môi trường biến động, đào thải nhanh", desc: "Thuật toán quảng cáo thay đổi liên tục; xu hướng tiêu dùng chuyển biến nhanh khiến các chiến dịch hôm qua có thể thất bại hôm nay." }
            ],
            salary: {
                entry: "7 – 12 Triệu / tháng",
                experienced: "25 – 45 Triệu / tháng",
                multiplier: "×3.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Vị trí Trưởng phòng Marketing (CMO) hoặc Giám đốc Kinh doanh có thể hưởng thêm hoa hồng doanh số không giới hạn.",
                entryBarPercent: 30,
                expBarPercent: 85
            },
            closingQuestion: "Bạn có tự tin thuyết phục một người lạ tin tưởng và chọn mua sản phẩm mà mình đang giới thiệu không?"
        },

        "Tài chính - Ngân hàng & Kế toán - Kiểm toán": {
            id: "tc_kt",
            name: "Tài chính - Ngân hàng & Kế toán - Kiểm toán",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất (60% chỉ tiêu)", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Tài chính", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Nhiều trường xét tuyển", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Khối kinh tế ưu tiên", isPopular: true },
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Toán học & Tư duy số liệu chuẩn xác — Ngành đòi hỏi sự tỉ mỉ, chính xác tuyệt đối với các con số; một sai sót nhỏ có thể dẫn tới rủi ro pháp lý lớn.",
            coreSubjectAlert: {
                subject: "Toán học & Tính cẩn trọng với số liệu",
                reason: "Báo cáo tài chính và sổ sách kế toán yêu cầu độ chính xác 100%. Nếu tính cách hấp tấp, ngại làm việc với bảng tính số liệu thì sẽ rất căng thẳng."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Học viện Tài chính, Học viện Ngân hàng, ĐH Kinh tế Quốc dân là top đầu. Cân nhắc thêm ĐH Thương mại hoặc ĐH Công đoàn cho mức điểm an toàn hơn.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Nhiều trường xét chứng chỉ nghề nghiệp quốc tế (ACCA, CFA, ICAEW) hoặc IELTS để cộng điểm ưu tiên."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Kinh tế học", desc: "Toán cao cấp, Kinh tế vi mô/vĩ mô, Nguyên lý kế toán căn bản." },
                    { year: "Năm 2", stage: "Cơ sở ngành & Thuế", desc: "Kế toán tài chính, Luật thuế, Thị trường tài chính, Tài chính doanh nghiệp." },
                    { year: "Năm 3", stage: "Chuyên sâu & Kiểm toán", desc: "Kiểm toán căn bản, Thẩm định giá, Định giá chứng khoán, Phần mềm kế toán MISA/SAP." },
                    { year: "Năm 4", stage: "Thực tập & Khóa luận", desc: "Thực tập tại công ty kiểm toán Big 4 hoặc ngân hàng, Hoàn thiện khóa luận." }
                ],
                plainExplanation: "Học cách 'bắt mạch' sức khỏe tiền tệ của doanh nghiệp: ghi nhận dòng tiền, lập báo cáo tài chính minh bạch, phân tích rủi ro đầu tư và hoạch định chiến lược vốn.",
                tools: ["Excel Advanced", "MISA", "SAP ERP", "PowerBI", "Bloomberg Terminal", "SPSS", "Python tài chính"],
                skills: [
                    { icon: "🔢", name: "Đọc hiểu Báo cáo tài chính", desc: "Phân tích cấu trúc bảng cân đối kế toán, báo cáo lãi lỗ và lưu chuyển tiền tệ" },
                    { icon: "⚖️", name: "Am hiểu chuẩn mực & Luật thuế", desc: "Nắm vững hệ thống chuẩn mực kế toán VAS/IFRS và chính sách thuế hiện hành" },
                    { icon: "🛡️", name: "Quản trị rủi ro dòng tiền", desc: "Đánh giá khả năng thanh khoản, đo lường rủi ro tín dụng và phòng ngừa tỷ giá" },
                    { icon: "📈", name: "Mô hình hóa tài chính (Financial Modeling)", desc: "Xây dựng kịch bản tài chính dự báo doanh thu và dòng tiền chiết khấu (DCF)" }
                ]
            },
            harshRealities: [
                { icon: "📅", title: "Mùa kiểm toán & Báo cáo cuối năm làm việc 14–16 tiếng/ngày", desc: "Từ tháng 12 đến tháng 4 hàng năm là mùa cao điểm; kiểm toán viên phải đi công tác liên tục và làm việc đến nửa đêm." },
                { icon: "⚖️", title: "Rủi ro pháp lý & Trách nhiệm bồi hoàn lớn", desc: "Sai sót trong ký duyệt chứng từ hoặc báo cáo kiểm toán có thể bị truy cứu trách nhiệm hành chính và bồi thường thiệt hại." },
                { icon: "🔁", title: "Công việc dễ đơn điệu, áp lực chính xác 100%", desc: "Hàng ngày phải đối chiếu từng dòng chứng từ, hóa đơn; tính chất công việc lặp đi lặp lại đòi hỏi tính kiên nhẫn cao độ." }
            ],
            salary: {
                entry: "8 – 13 Triệu / tháng",
                experienced: "28 – 45 Triệu / tháng",
                multiplier: "×3.2",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Chuyên gia có chứng chỉ CFA hoặc ACCA làm tại các quỹ đầu tư quốc tế có mức lương hàng nghìn USD.",
                entryBarPercent: 32,
                expBarPercent: 88
            },
            closingQuestion: "Bạn có đủ kiên nhẫn để ngồi rà soát từng dòng số liệu trong một bảng tính hàng trăm nghìn ô để tìm ra sai số 1 đồng không?"
        },

        "Y khoa / Dược học & Khoa học sức khỏe": {
            id: "y_duoc",
            name: "Y khoa / Dược học & Khoa học sức khỏe",
            combos: [
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Tổ hợp truyền thống số 1", isPrimary: true },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Xét tuyển ngành Dược / Y sinh", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Một số trường công lập", isPrimary: false },
                { code: "B08", subjects: "Toán · Sinh học · Tiếng Anh", tag: "Chương trình tiên tiến", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Tổ hợp cốt lõi", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Ngành Dược / Y sinh", isPopular: false },
                { combo: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Sinh học & Hóa học — Khối lượng kiến thức ghi nhớ khổng lồ về cơ thể người, bệnh học và dược lý. Đòi hỏi khả năng tự học bền bỉ nhiều năm.",
            coreSubjectAlert: {
                subject: "Sinh học & Hóa học (Giải phẫu & Dược lý)",
                reason: "Chương trình học cực kỳ nặng, hàng nghìn trang giáo trình giải phẫu, dược chất và sinh lý bệnh. Bắt buộc có trí nhớ tốt và sự kiên trì phi thường."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Y Hà Nội và ĐH Y Dược TP.HCM điểm sàn rất cao (27.5-28.5đ). Các trường ĐH Y Hải Phòng, ĐH Y Thái Bình, ĐH Y Cần Thơ là phương án an toàn hơn.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Một số trường ưu tiên xét tuyển chứng chỉ tiếng Anh (IELTS từ 6.5 trở lên) kết hợp điểm khối B00."
            },
            curriculum: {
                duration: "6 NĂM (Bác sĩ) / 5 NĂM (Dược sĩ)",
                timeline: [
                    { year: "Năm 1-2", stage: "Đại cương & Giải phẫu cơ bản", desc: "Giải phẫu học thực hành, Sinh lý học, Hóa sinh, Vi sinh - Ký sinh trùng." },
                    { year: "Năm 3", stage: "Tiền lâm sàng & Bệnh học", desc: "Triệu chứng học, Dược lý học, Đi lâm sàng bệnh viện buổi sáng, học lý thuyết buổi chiều." },
                    { year: "Năm 4-5", stage: "Lâm sàng chuyên khoa", desc: "Nội khoa, Ngoại khoa, Sản khoa, Nhi khoa; Trực đêm cấp cứu tại bệnh viện." },
                    { year: "Năm 6", stage: "Thực tập tốt nghiệp", desc: "Thực tập toàn diện tại các viện tuyến đầu, Thi tốt nghiệp lâm sàng & Lý thuyết quốc gia." }
                ],
                plainExplanation: "Đào tạo người thầy thuốc cứu người: thấu hiểu cơ chế bệnh sinh, đọc kết quả xét nghiệm/hình ảnh, chẩn đoán chính xác và đưa ra phác đồ điều trị hiệu quả cho bệnh nhân.",
                tools: ["Ống nghe y tế", "Hệ thống Bệnh án điện tử (EMR)", "Mô hình phẫu thuật 3D", "Dược thư Quốc gia", "Máy đo điện tim ECG", "Phần mềm chẩn đoán PACS"],
                skills: [
                    { icon: "🩺", name: "Khám lâm sàng & Chẩn đoán", desc: "Quan sát, thăm khám tỉ mỉ và tổng hợp triệu chứng để đưa ra kết luận bệnh chính xác" },
                    { icon: "🧠", name: "Trí nhớ siêu đẳng & Xử lý áp lực", desc: "Ghi nhớ hàng chục nghìn thuật ngữ y khoa và giữ bình tĩnh tuyệt đối trong phòng cấp cứu" },
                    { icon: "❤️", name: "Y đức & Giao tiếp người bệnh", desc: "Lắng nghe, thấu cảm và giải thích nhẹ nhàng, rõ ràng cho bệnh nhân và thân nhân" },
                    { icon: "🔬", name: "Cập nhật Y học thực chứng (EBM)", desc: "Liên tục đọc các thử nghiệm lâm sàng và phác đồ mới của Bộ Y tế và WHO" }
                ]
            },
            harshRealities: [
                { icon: "⏳", title: "Thời gian đào tạo dài nhất & Khởi đầu muộn", desc: "6 năm đại học + 18 tháng thực hành lấy chứng chỉ hành nghề (CCHN) + 3 năm bác sĩ nội trú; khi bạn bè đã ổn định thì bạn vẫn đi học." },
                { icon: "🩸", title: "Áp lực trực đêm thâu đêm & Sinh mạng con người", desc: "Trực cấp cứu 24 tiếng liên tục, đối mặt với máu me, ranh giới sinh tử và áp lực từ phía người nhà bệnh nhân; không được phép sai sót." },
                { icon: "📉", title: "Thu nhập khởi điểm thấp so với công sức bỏ ra", desc: "Lương bác sĩ mới ra trường tại bệnh viện công lập khởi điểm theo ngạch viên chức chỉ khoảng 6–9 triệu; phải mất 8–10 năm mới đạt thu nhập cao." }
            ],
            salary: {
                entry: "7 – 11 Triệu / tháng",
                experienced: "35 – 70 Triệu / tháng",
                multiplier: "×4.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Khi có Chứng chỉ hành nghề và mở phòng khám riêng hoặc làm bệnh viện quốc tế, thu nhập có thể đạt 80–120 triệu/tháng.",
                entryBarPercent: 28,
                expBarPercent: 92
            },
            closingQuestion: "Bạn có đủ dũng khí và lòng kiên nhẫn để cống hiến 8–10 năm thanh xuân miệt mài học tập và trực viện trước khi có mức thu nhập ổn định không?"
        },

        "Điều dưỡng & Kỹ thuật Y sinh": {
            id: "dieu_duong",
            name: "Điều dưỡng & Kỹ thuật Y sinh",
            combos: [
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Phổ biến nhất", isPrimary: true },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Kỹ thuật y sinh", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Một số trường", isPrimary: false },
                { code: "B08", subjects: "Toán · Sinh học · Tiếng Anh", tag: "Điều dưỡng quốc tế", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Sinh học & Sự kiên nhẫn thấu cảm — Công việc gắn liền trực tiếp với bệnh nhân và hệ thống thiết bị hỗ trợ sự sống.",
            coreSubjectAlert: {
                subject: "Sinh học & Tinh thần phụng sự",
                reason: "Chăm sóc người bệnh đòi hỏi nền tảng giải phẫu sinh lý tốt cùng đức tính cẩn trọng, kiên nhẫn và chịu khó trước mọi hoàn cảnh."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Điểm chuẩn ngành Điều dưỡng dao động từ 19 – 23.5 điểm, dễ tiếp cận hơn nhiều so với Y đa khoa.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Nhiều chương trình Điều dưỡng liên kết việc làm tại Nhật Bản, CHLB Đức tuyển sinh kèm cam kết học bổng ngoại ngữ."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Giải phẫu", desc: "Giải phẫu sinh lý, Vi sinh, Đạo đức y khoa, Giao tiếp trong y tế." },
                    { year: "Năm 2", stage: "Kỹ thuật điều dưỡng cơ bản", desc: "Quy trình chăm sóc, Tiêm truyền, Sơ cứu cấp cứu, Kiểm soát nhiễm khuẩn." },
                    { year: "Năm 3", stage: "Chăm sóc chuyên khoa", desc: "Điều dưỡng Nội - Ngoại - Sản - Nhi, Vận hành máy theo dõi bệnh nhân (Monitor)." },
                    { year: "Năm 4", stage: "Thực tập toàn diện", desc: "Thực tập trực ca tại các bệnh viện lớn, Hoàn thành báo cáo tốt nghiệp." }
                ],
                plainExplanation: "Trụ cột chăm sóc bệnh nhân trong hệ thống y tế: thực hiện y lệnh, theo dõi sát sao diễn biến sinh hiệu (mạch, nhiệt độ, huyết áp) và hỗ trợ phục hồi sức khỏe.",
                tools: ["Máy Monitor theo dõi sinh hiệu", "Bơm tiêm điện", "Máy thở", "Hệ thống quản lý điều dưỡng EMR", "Dụng cụ chăm sóc vết thương"],
                skills: [
                    { icon: "💉", name: "Thành thạo kỹ thuật tiêm truyền & sơ cứu", desc: "Thực hiện chính xác kỹ thuật điều dưỡng an toàn, không gây đau đớn cho bệnh nhân" },
                    { icon: "⏱️", name: "Nhạy bén nhận diện biến chứng", desc: "Phát hiện ngay lập tức các dấu hiệu suy hô hấp, sốc phản vệ để báo bác sĩ can thiệp" },
                    { icon: "🤝", name: "Tâm lý tiếp xúc & An ủi người bệnh", desc: "Giúp người bệnh và gia đình an tâm, hợp tác tích cực trong quá trình điều trị" },
                    { icon: "🌐", name: "Tiếng Đức / Tiếng Nhật (nếu đi xuất khẩu)", desc: "Mở ra cơ hội làm việc tại các nước phát triển với mức thu nhập hấp dẫn" }
                ]
            },
            harshRealities: [
                { icon: "🏃", title: "Áp lực thể lực rất lớn (Trực ca kíp 24/7)", desc: "Thường xuyên phải đi lại liên tục, nâng đỡ bệnh nhân nặng và đảo lộn đồng hồ sinh học do làm ca đêm kéo dài." },
                { icon: "☣️", title: "Nguy cơ lây nhiễm chéo & Phơi nhiễm nghề nghiệp", desc: "Tiếp xúc trực tiếp hàng ngày với dịch tiết, máu và các nguồn bệnh truyền nhiễm đòi hỏi kỷ luật phòng hộ nghiêm ngặt." },
                { icon: "💬", title: "Áp lực tâm lý từ phía người nhà bệnh nhân", desc: "Thường xuyên phải hứng chịu sự bức xúc, nóng nảy của thân nhân trong lúc lo lắng cấp bách mà vẫn phải giữ thái độ hòa nhã." }
            ],
            salary: {
                entry: "7 – 10 Triệu / tháng",
                experienced: "18 – 30 Triệu / tháng",
                multiplier: "×2.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Nếu làm việc tại Nhật Bản hoặc Đức theo diện điều dưỡng viên, thu nhập đạt từ 45 – 70 triệu/tháng.",
                entryBarPercent: 28,
                expBarPercent: 75
            },
            closingQuestion: "Bạn có lòng bao dung và sự tận tụy để chăm sóc người bệnh ốm đau như chính người thân của mình không?"
        },

        "Kỹ thuật / Cơ điện tử & Tự động hóa": {
            id: "cd_tdh",
            name: "Kỹ thuật / Cơ điện tử & Tự động hóa",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Kỹ thuật", isPrimary: false },
                { code: "C01", subjects: "Toán · Vật lí · Ngữ văn", tag: "Một số trường kỹ thuật", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Cốt lõi khối Kỹ thuật", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên xét tuyển", isPopular: true },
                { combo: "C01", subjects: "Toán · Vật lí · Ngữ văn", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Vật lý & Toán ứng dụng — Môn học cốt lõi bao gồm Cơ học giải tích, Sức bền vật liệu, Lý thuyết điều khiển tự động và Điện tử công suất.",
            coreSubjectAlert: {
                subject: "Vật lý (Cơ học & Điện học) & Toán",
                reason: "Chế tạo robot và dây chuyền tự động đòi hỏi hiểu sâu về cân bằng lực, truyền động cơ khí và thuật toán vi điều khiển."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Bách Khoa Hà Nội và Bách Khoa TP.HCM điểm rất cao (26-27.5đ). ĐH Giao thông Vận tải, ĐH Công nghiệp, ĐH Sư phạm Kỹ thuật là lựa chọn tuyệt vời vừa tầm.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Ưu tiên điểm thi Đánh giá tư duy (ĐHBK) hoặc ĐGNL ĐHQG với trọng số cao môn Toán - Lý."
            },
            curriculum: {
                duration: "4.5 – 5 NĂM (Kỹ sư)",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Toán - Lý", desc: "Toán cao cấp, Vật lý đại cương, Vẽ kỹ thuật, Nhập môn ngành Cơ điện tử." },
                    { year: "Năm 2", stage: "Cơ sở cơ học & Điện tử", desc: "Sức bền vật liệu, Nguyên lý máy, Mạch điện - Điện tử, Lập trình C cho vi điều khiển." },
                    { year: "Năm 3", stage: "Tự động hóa & Khí nén", desc: "Lập trình PLC, Hệ thống khí nén thủy lực, Cảm biến công nghiệp, Robot học." },
                    { year: "Năm 4-5", stage: "Đồ án & Thực tập nhà máy", desc: "Thiết kế dây chuyền SCADA/MES, Chế tạo tay máy robot, Thực tập tại nhà máy FDI." }
                ],
                plainExplanation: "Kết hợp cơ khí chính xác, điện tử thông minh và lập trình điều khiển để tạo ra các cỗ máy tự động: từ cánh tay robot hàn ô tô đến dây chuyền đóng gói thông minh.",
                tools: ["AutoCAD", "SolidWorks", "Siemens TIA Portal", "MATLAB/Simulink", "Altium Designer", "LabVIEW", "Arduino/STM32"],
                skills: [
                    { icon: "⚙️", name: "Thiết kế mô hình 3D cơ khí", desc: "Mô phỏng động lực học và thiết kế chi tiết máy trên phần mềm SolidWorks" },
                    { icon: "⚡", name: "Lập trình PLC & Hệ thống SCADA", desc: "Viết logic điều khiển cho các bộ điều khiển công nghiệp Siemens, Mitsubishi, Omron" },
                    { icon: "🤖", name: "Tích hợp Robot công nghiệp", desc: "Lập trình đường đi và phối hợp hoạt động cho cánh tay robot trong dây chuyền" },
                    { icon: "🔧", name: "Chẩn đoán & Bảo trì sự cố", desc: "Đọc sơ đồ mạch điện và xử lý nhanh chóng các lỗi dừng máy trong nhà xưởng" }
                ]
            },
            harshRealities: [
                { icon: "🏭", title: "Môi trường làm việc tại nhà máy ồn ào, bụi bặm", desc: "Kỹ sư thường làm việc trực tiếp tại phân xưởng sản xuất, tiếp xúc với tiếng ồn máy dập, dầu mỡ và nhiệt độ cao." },
                { icon: "🚗", title: "Thường xuyên công tác xa hoặc làm việc ở KCN ngoại ô", desc: "Các nhà máy sản xuất lớn thường nằm ở các khu công nghiệp xa trung tâm thành phố (Bắc Ninh, Bình Dương, Đồng Nai, Hải Phòng)." },
                { icon: "⚠️", title: "Áp lực an toàn lao động & Rủi ro dừng dây chuyền", desc: "Một sự cố máy móc có thể làm ngưng trệ toàn bộ dây chuyền sản xuất của nhà máy, gây thiệt hại hàng trăm triệu mỗi giờ." }
            ],
            salary: {
                entry: "8 – 14 Triệu / tháng",
                experienced: "25 – 45 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Kỹ sư tự động hóa làm việc tại các tập đoàn FDI (Samsung, LG, VinFast, Foxconn) thường có chế độ đãi ngộ rất tốt.",
                entryBarPercent: 32,
                expBarPercent: 86
            },
            closingQuestion: "Bạn có thích tự tay tháo lắp, đấu nối vi mạch và lập trình để một cánh tay robot chuyển động theo ý mình không?"
        },

        "Điện - Điện tử & Năng lượng tái tạo": {
            id: "dien_dt",
            name: "Điện - Điện tử & Năng lượng tái tạo",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Kỹ thuật", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số trường xét tuyển", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Kỹ thuật", isPopular: true }
            ],
            coreSubjectWarning: "Vật lý (Điện học) & Toán giải tích — Môn học nền tảng là Trường điện từ, Lý thuyết mạch điện, Điện tử công suất và Hệ thống điện quốc gia.",
            coreSubjectAlert: {
                subject: "Vật lý (Điện học & Mạch điện) & Toán",
                reason: "Kiến thức về dòng điện xoay chiều, sóng điện từ và mạch bán dẫn rất trừu tượng, đòi hỏi tư duy hình học không gian và tích phân vi phân tốt."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Bách Khoa, ĐH Điện lực, ĐH Sư phạm Kỹ thuật đều có thế mạnh đào tạo ngành này với nhiều dải điểm từ 20 – 26.5 điểm.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Ngành năng lượng tái tạo và bán dẫn vi mạch đang được các trường ưu tiên cấp học bổng tài năng từ doanh nghiệp."
            },
            curriculum: {
                duration: "4.5 – 5 NĂM (Kỹ sư)",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Toán - Lý", desc: "Toán cao cấp, Vật lý đại cương (Phần Điện - Từ), Cơ sở kỹ thuật điện." },
                    { year: "Năm 2", stage: "Mạch điện & Điện tử cơ bản", desc: "Lý thuyết mạch điện, Kỹ thuật điện tử tương tự & số, Vi xử lý, An toàn điện." },
                    { year: "Năm 3", stage: "Hệ thống điện & Năng lượng xanh", desc: "Điện tử công suất, Hệ thống điện pin mặt trời & điện gió, Trạm biến áp, Lưới điện thông minh." },
                    { year: "Năm 4-5", stage: "Thiết kế & Tốt nghiệp", desc: "Thiết kế trạm điện/hệ thống điện công nghiệp, Thực tập tại EVN/doanh nghiệp năng lượng." }
                ],
                plainExplanation: "Làm chủ huyết mạch năng lượng của xã hội: thiết kế hệ thống truyền tải điện lưới, chế tạo thiết bị bán dẫn và phát triển nguồn năng lượng sạch (điện mặt trời, điện gió, pin lưu trữ).",
                tools: ["MATLAB", "ETAP", "Altium Designer", "PSCAD", "AutoCAD Electrical", "PVsyst (Năng lượng mặt trời)", "Multisim"],
                skills: [
                    { icon: "⚡", name: "Tính toán & Thiết kế lưới điện", desc: "Phân tích trào lưu công suất, ngắn mạch và bảo vệ rơ-le cho trạm biến áp" },
                    { icon: "☀️", name: "Thiết kế hệ thống Năng lượng xanh", desc: "Mô phỏng và tối ưu hiệu suất tấm pin năng lượng mặt trời và turbine gió" },
                    { icon: "🔌", name: "Thiết kế mạch in PCB & Bán dẫn", desc: "Vẽ và layout mạch điện tử công suất phục vụ thiết bị IoT và biến tần" },
                    { icon: "🛡️", name: "Quy chuẩn an toàn điện cao áp", desc: "Tuân thủ nghiêm ngặt quy trình cô lập nguồn và an toàn vận hành lưới điện" }
                ]
            },
            harshRealities: [
                { icon: "📚", title: "Khối lượng lý thuyết mạch cực kỳ trừu tượng", desc: "Lý thuyết trường điện từ và biến đổi Laplace trong phân tích mạch đòi hỏi tính toán giải tích phức tạp." },
                { icon: "⚡", title: "Môi trường công trường trạm điện nhiều hiểm nguy", desc: "Kỹ sư năng lượng thường phải làm việc tại các trạm biến áp cao thế, cánh đồng điện gió giữa nắng gió khắc nghiệt." },
                { icon: "⚠️", title: "Áp lực an toàn điện sinh mạng ở mức tối cao", desc: "Làm việc với lưới điện trung - cao thế đòi hỏi sự tập trung tuyệt đối; một sai sót quy trình có thể dẫn đến tai nạn phóng điện nghiêm trọng." }
            ],
            salary: {
                entry: "8 – 14 Triệu / tháng",
                experienced: "26 – 45 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Kỹ sư thiết kế vi mạch bán dẫn hoặc dự án điện gió ngoài khơi có thể đạt mức lương 50–80 triệu/tháng.",
                entryBarPercent: 32,
                expBarPercent: 86
            },
            closingQuestion: "Bạn có hứng thú khám phá cách thức một trang trại điện gió khổng lồ biến sức gió thành dòng điện thắp sáng cả thành phố không?"
        },

        "Kiến trúc & Thiết kế nội thất": {
            id: "kt_nt",
            name: "Kiến trúc & Thiết kế nội thất",
            combos: [
                { code: "V00", subjects: "Toán · Vật lí · Vẽ mỹ thuật", tag: "Xét tuyển khối Kiến trúc", isPrimary: true },
                { code: "H00", subjects: "Ngữ văn · Hình họa · Bố cục màu", tag: "Khối năng khiếu mỹ thuật", isPrimary: false },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường xét tuyển", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Thiết kế nội thất mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "V00", subjects: "Toán · Vật lí · Vẽ mỹ thuật", tag: "Khối tuyển sinh chính", isPopular: true },
                { combo: "H00", subjects: "Ngữ văn · Hình họa · Bố cục màu", tag: "Khối năng khiếu", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Năng khiếu Hình họa & Vẽ mỹ thuật — Môn thi Vẽ thường nhân hệ số 2 và bắt buộc phải đạt điểm sàn năng khiếu từ 5.0 trở lên.",
            coreSubjectAlert: {
                subject: "Vẽ mỹ thuật & Cảm nhận không gian 3D",
                reason: "Bắt buộc phải luyện thi vẽ tĩnh vật, hình họa đầu tượng hoặc bố cục màu tại các lớp vẽ chuyên nghiệp từ 6 – 12 tháng trước kỳ thi."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Kiến trúc Hà Nội, ĐH Kiến trúc TP.HCM, ĐH Xây dựng là top 1. Cân nhắc thêm ĐH Mỹ thuật Công nghiệp, ĐH Văn Lang, ĐH HUTECH cho phương án an toàn.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Theo dõi kỹ lịch thi môn Năng khiếu Vẽ do chính trường đại học tổ chức (thường vào tháng 6 hoặc tháng 7 hàng năm)."
            },
            curriculum: {
                duration: "5 NĂM (Kiến trúc sư) / 4 NĂM (Nội thất)",
                timeline: [
                    { year: "Năm 1", stage: "Mỹ thuật cơ bản & Hình khối", desc: "Hình họa vẽ chì, Bố cục tạo hình, Lịch sử kiến trúc thế giới, Cơ sở tạo hình kiến trúc." },
                    { year: "Năm 2", stage: "Đồ án kiến trúc nhà ở", desc: "Nguyên lý thiết kế nhà ở, Vật liệu xây dựng, Vẽ phối cảnh trên AutoCAD & SketchUp." },
                    { year: "Năm 3", stage: "Công trình công cộng & Nội thất", desc: "Thiết kế trường học, bảo tàng, Chiếu sáng nội thất, Dựng hình 3Ds Max & Render V-Ray." },
                    { year: "Năm 4-5", stage: "Đô thị & Đồ án tốt nghiệp", desc: "Quy hoạch đô thị, Cấu tạo kiến trúc chuyên sâu, Bảo vệ đồ án tốt nghiệp trước hội đồng." }
                ],
                plainExplanation: "Nghệ sĩ tạo dựng không gian sống: kết hợp tư duy thẩm mỹ nghệ thuật và kiến thức kết cấu kỹ thuật để thiết kế nên những ngôi nhà, tòa cao ốc và không gian nội thất tinh tế.",
                tools: ["AutoCAD", "SketchUp", "3Ds Max", "Revit BIM", "Photoshop", "Lumion / Enscape", "Corona Render"],
                skills: [
                    { icon: "✏️", name: "Tư duy không gian 3D & Phác thảo", desc: "Biến ý tưởng trong đầu thành các bản phác tay và mô hình hình khối nhanh chóng" },
                    { icon: "🏛️", name: "Bố cục mặt bằng công năng", desc: "Sắp xếp luồng di chuyển, thông gió tự nhiên và đón ánh sáng hợp lý cho ngôi nhà" },
                    { icon: "🖥️", name: "Làm chủ phần mềm đồ họa 3D", desc: "Render hình ảnh phối cảnh chân thực (Photorealistic) để khách hàng hình dung" },
                    { icon: "🪵", name: "Am hiểu vật liệu & Biện pháp thi công", desc: "Hiểu rõ tính chất gỗ, kính, bê tông, kim loại để bản vẽ có thể thi công thực tế" }
                ]
            },
            harshRealities: [
                { icon: "🌙", title: "Triền miên thức trắng đêm sửa đồ án", desc: "Sinh viên kiến trúc nổi tiếng với những tuần 'thông đồ án' thâu đêm ở xưởng trường để kịp tiến độ nộp bài." },
                { icon: "🔄", title: "Khách hàng & Chủ đầu tư yêu cầu sửa đổi bản vẽ nhiều lần", desc: "Phải rèn luyện sự kiên nhẫn khi đứa con tinh thần của mình bị khách hàng yêu cầu đập đi vẽ lại vì phong thủy hoặc sở thích riêng." },
                { icon: "🤖", title: "Cạnh tranh gay gắt từ công cụ AI tạo sinh ảnh", desc: "Các công cụ AI (Midjourney, DALL-E) có thể render phối cảnh trong vài giây; kiến trúc sư buộc phải đi sâu vào chi tiết kỹ thuật và am hiểu vật liệu thực tế." }
            ],
            salary: {
                entry: "8 – 13 Triệu / tháng",
                experienced: "28 – 55 Triệu / tháng",
                multiplier: "×3.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Kiến trúc sư nhận thiết kế trọn gói biệt thự, resort hoặc làm công ty thiết kế quốc tế có thu nhập rất cao.",
                entryBarPercent: 30,
                expBarPercent: 90
            },
            closingQuestion: "Bạn có sẵn sàng thức trọn đêm để chăm chút từng đường nét tỉ mỉ trên một bản vẽ phối cảnh công trình tâm huyết của mình không?"
        },

        "Xây dựng & Quản lý dự án": {
            id: "xd_da",
            name: "Xây dựng & Quản lý dự án",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất (75% chỉ tiêu)", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Xét tuyển kỹ thuật", isPrimary: false },
                { code: "C01", subjects: "Toán · Vật lí · Ngữ văn", tag: "Một số trường xét tuyển", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Khối xét tuyển trọng tâm", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Toán & Vật lý cơ học — Nền tảng tính toán khả năng chịu lực: Sức bền vật liệu, Cơ học kết cấu, Kết cấu bê tông cốt thép và Cơ học đất móng.",
            coreSubjectAlert: {
                subject: "Toán & Vật lý cơ học (Kết cấu công trình)",
                reason: "Mọi tòa nhà cao tầng hay cây cầu đều phải được tính toán khả năng chịu tải trọng gió, động đất và trọng lực để đảm bảo tuyệt đối an toàn."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Xây dựng Hà Nội, ĐH Bách Khoa, ĐH Giao thông Vận tải điểm chuẩn từ 19 – 24 điểm; phổ điểm khá dễ thở so với ngành IT.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Nhiều trường xét học bạ kết hợp phỏng vấn hoặc điểm thi ĐGNL với cơ hội trúng tuyển cao."
            },
            curriculum: {
                duration: "4.5 – 5 NĂM (Kỹ sư)",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Vẽ xây dựng", desc: "Toán cao cấp, Vật lý cơ học, Vẽ kỹ thuật xây dựng, Trắc địa thực địa." },
                    { year: "Năm 2", stage: "Cơ học công trình & Vật liệu", desc: "Sức bền vật liệu, Cơ học kết cấu, Vật liệu xây dựng, Địa chất công trình." },
                    { year: "Năm 3", stage: "Kết cấu Bê tông & Thép", desc: "Kết cấu bê tông cốt thép, Kết cấu thép, Nền móng công trình, Dự toán chi phí." },
                    { year: "Năm 4-5", stage: "Quản lý thi công & Tốt nghiệp", desc: "Tổ chức thi công, An toàn lao động, Quản lý dự án Primavera/MS Project, Bảo vệ đồ án." }
                ],
                plainExplanation: "Hiện thực hóa các bản vẽ trên giấy thành những công trình kiên cố ngoài đời thực: tính toán kết cấu thép bê tông, điều phối nhân lực máy móc và quản lý tiến độ bàn giao công trình.",
                tools: ["AutoCAD", "ETABS (Tính kết cấu)", "SAP2000", "Revit Structure", "MS Project", "Safe", "Phần mềm Dự toán G8"],
                skills: [
                    { icon: "🏗️", name: "Tính toán & Thẩm tra kết cấu", desc: "Mô hình hóa tải trọng và phân tích nội lực bằng phần mềm ETABS/SAP2000" },
                    { icon: "📋", name: "Bóc tách khối lượng & Lập dự toán", desc: "Tính toán chính xác số lượng thép, xi măng, nhân công và chi phí dự án" },
                    { icon: "👷", name: "Giám sát & Quản lý thi công hiện trường", desc: "Kiểm tra chất lượng cốt thép, đổ bê tông và đôn đốc công nhân đúng quy chuẩn" },
                    { icon: "📅", name: "Kiểm soát tiến độ & An toàn lao động (HSE)", desc: "Lập tiến độ thi công đường găng và đảm bảo không xảy ra tai nạn công trường" }
                ]
            },
            harshRealities: [
                { icon: "☀️", title: "Phơi nắng mưa theo chân công trình, xa gia đình", desc: "Kỹ sư hiện trường phải bám trụ ở công trường từ sáng sớm đến đêm, thường xuyên ăn ở tại lán trại dự án xa nhà." },
                { icon: "💸", title: "Nợ đọng vốn, áp lực tiến độ bàn giao công trình", desc: "Chủ đầu tư chậm giải ngân vốn, nhà thầu nợ lương và áp lực phải 'chạy tiến độ' trước mùa mưa bão gây căng thẳng thần kinh." },
                { icon: "⚠️", title: "Rủi ro an toàn lao động tại công trường", desc: "Môi trường làm việc trên cao với giàn giáo, cần cẩu và hố móng tiềm ẩn nguy cơ tai nạn nếu thiếu kỷ luật an toàn lao động." }
            ],
            salary: {
                entry: "8 – 13 Triệu / tháng",
                experienced: "25 – 45 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Chỉ huy trưởng công trường hoặc Quản lý dự án tại các tập đoàn lớn (Coteccons, Hòa Bình, VinGroup) có thu nhập rất cao.",
                entryBarPercent: 30,
                expBarPercent: 86
            },
            closingQuestion: "Bạn có chịu được sự vất vả phơi nắng gió tại công trường để tự hào nhìn thấy cây cầu hay tòa nhà do chính mình dựng nên không?"
        },

        "Nông nghiệp công nghệ cao & Công nghệ thực phẩm": {
            id: "nn_tp",
            name: "Nông nghiệp công nghệ cao & Công nghệ thực phẩm",
            combos: [
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Khối kỹ thuật thực phẩm", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false },
                { code: "B08", subjects: "Toán · Sinh học · Tiếng Anh", tag: "Một số trường xét tuyển", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Khối xét tuyển chính", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Hóa học & Sinh học — Hai môn nền tảng để nghiên cứu công nghệ vi sinh, hóa sinh học thực phẩm, kỹ thuật lên men và di truyền thực vật.",
            coreSubjectAlert: {
                subject: "Hóa học & Sinh học vi sinh",
                reason: "Chế biến và bảo quản thực phẩm dựa hoàn toàn vào phản ứng hóa sinh và kiểm soát vi sinh vật gây hại để đảm bảo an toàn vệ sinh."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Học viện Nông nghiệp VN, ĐH Bách Khoa, ĐH Nông Lâm TP.HCM, ĐH Cần Thơ điểm chuẩn từ 18 – 24 điểm, cơ hội trúng tuyển rộng mở.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Nhu cầu nhân lực kỹ sư công nghệ thực phẩm tại các tập đoàn thực phẩm lớn (Masan, Vinamilk, CP, Nestlé) luôn rất cao."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Hóa học đại cương", desc: "Hóa vô cơ, Hóa hữu cơ, Sinh học đại cương, Toán cao cấp." },
                    { year: "Năm 2", stage: "Hóa sinh & Vi sinh thực phẩm", desc: "Hóa sinh học thực phẩm, Vi sinh vật học, Quá trình & Thiết bị công nghệ thực phẩm." },
                    { year: "Năm 3", stage: "Công nghệ chế biến chuyên sâu", desc: "Công nghệ chế biến sữa, thịt, đồ hộp, đồ uống lên men, Hệ thống quản lý chất lượng HACCP/ISO 22000." },
                    { year: "Năm 4", stage: "R&D sản phẩm & Khóa luận", desc: "Phát triển sản phẩm mới (R&D), Đánh giá cảm quan thực phẩm, Thực tập tại nhà máy chế biến." }
                ],
                plainExplanation: "Ứng dụng khoa học kỹ thuật để sản xuất và bảo quản thực phẩm sạch: từ lai tạo giống cây trồng năng suất cao trong nhà kính tự động đến đóng gói và kiểm định chất lượng thực phẩm xuất khẩu.",
                tools: ["Máy sắc ký lỏng HPLC", "Máy đo pH/độ nhớt", "Phần mềm quản lý chất lượng QA/QC", "Hệ thống tưới tự động IoT", "Thiết bị thanh trùng UHT"],
                skills: [
                    { icon: "🧪", name: "Kiểm nghiệm & Đảm bảo chất lượng (QA/QC)", desc: "Phân tích dư lượng thuốc bảo vệ thực vật, vi khuẩn E.coli và độc tố trong sản phẩm" },
                    { icon: "🍃", name: "Vận hành canh tác nhà kính IoT", desc: "Cài đặt thông số nhiệt độ, độ ẩm và dinh dưỡng thủy canh tự động bằng cảm biến" },
                    { icon: "🔬", name: "Nghiên cứu & Phát triển sản phẩm mới (R&D)", desc: "Sáng tạo công thức đồ uống, snack mới phù hợp với thị hiếu người tiêu dùng" },
                    { icon: "📜", name: "Am hiểu tiêu chuẩn an toàn quốc tế", desc: "Xây dựng quy trình đạt chuẩn VietGAP, GlobalGAP, HACCP để xuất khẩu sang EU, Mỹ" }
                ]
            },
            harshRealities: [
                { icon: "🧪", title: "Thời gian dài làm việc tại phòng thí nghiệm hoặc nhà kính", desc: "Môi trường làm việc ngửi mùi hóa chất, môi trường lên men hoặc chịu nhiệt độ cao trong nhà kính nông nghiệp suốt nhiều giờ." },
                { icon: "🌦️", title: "Phụ thuộc vào yếu tố thời tiết, dịch bệnh và mùa vụ", desc: "Các dự án trồng trọt có thể bị thiệt hại nặng nề nếu bùng phát dịch hại hoặc bão lũ bất ngờ làm hư hại nông trại." },
                { icon: "💬", title: "Định kiến xã hội về ngành nông nghiệp còn nặng", desc: "Nhiều người vẫn lầm tưởng học nông nghiệp là đi làm ruộng chân lấm tay bùn, dù thực tế ngày nay là làm việc với máy móc công nghệ cao." }
            ],
            salary: {
                entry: "7 – 11 Triệu / tháng",
                experienced: "22 – 38 Triệu / tháng",
                multiplier: "×2.8",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Chuyên viên R&D hoặc Quản lý chất lượng tại các tập đoàn đa quốc gia có mức lương từ 35–50 triệu/tháng.",
                entryBarPercent: 28,
                expBarPercent: 78
            },
            closingQuestion: "Bạn có đam mê sáng tạo ra những món đồ ăn, thức uống thơm ngon, an toàn cho hàng triệu người tiêu dùng mỗi ngày không?"
        },

        "Môi trường & Khoa học bền vững": {
            id: "mt_bn",
            name: "Môi trường & Khoa học bền vững",
            combos: [
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Phổ biến nhất", isPrimary: true },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Kỹ thuật môi trường", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Quản lý môi trường", isPrimary: false },
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Một số trường xét tuyển", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Khối xét tuyển chính", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Sinh học & Địa lý — Nền tảng đánh giá tác động sinh thái, biến đổi khí hậu, xử lý nước thải và quản lý tài nguyên thiên nhiên.",
            coreSubjectAlert: {
                subject: "Sinh học sinh thái & Hóa học môi trường",
                reason: "Hiểu rõ vòng tuần hoàn vật chất, chỉ số ô nhiễm COD, BOD và các quy chuẩn xả thải để thiết kế hệ thống xử lý nước và khí thải."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Khoa học Tự nhiên, ĐH Bách Khoa, ĐH Tài nguyên & Môi trường điểm chuẩn vừa tầm từ 17 – 23 điểm.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Xu hướng các doanh nghiệp phải tuân thủ chuẩn báo cáo phát triển bền vững (ESG) đang mở ra nhiều cơ hội việc làm mới."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Sinh thái học", desc: "Hóa học đại cương, Sinh thái học căn bản, Khí tượng thủy văn, Bản đồ GIS." },
                    { year: "Năm 2", stage: "Hóa học môi trường & Phân tích", desc: "Hóa phân tích môi trường, Độc chất học, Vi sinh vật môi trường, Lấy mẫu hiện trường." },
                    { year: "Năm 3", stage: "Công nghệ xử lý chất thải", desc: "Kỹ thuật xử lý nước thải, Xử lý khí thải, Quản lý chất thải rắn, Báo cáo ĐTM (Đánh giá tác động)." },
                    { year: "Năm 4", stage: "Kinh tế tuần hoàn & Khóa luận", desc: "Tín chỉ carbon, Kiểm kê khí nhà kính, Tiêu chuẩn ESG, Thực tập tại các sở ban ngành hoặc doanh nghiệp." }
                ],
                plainExplanation: "Bác sĩ chữa lành hành tinh: thiết kế hệ thống xử lý nước thải công nghiệp, đo lường lượng phát thải carbon và tư vấn cho doanh nghiệp các giải pháp sản xuất xanh không gây ô nhiễm.",
                tools: ["ArcGIS / QGIS", "Máy đo khí đa chỉ tiêu", "Máy quang phổ hấp thụ nguyên tử AAS", "AutoCAD môi trường", "Phần mềm tính toán phát thải GHG"],
                skills: [
                    { icon: "💧", name: "Thiết kế trạm xử lý nước thải", desc: "Tính toán bể vi sinh hiếu khí - kỵ khí và quy trình lắng bùn hoạt tính" },
                    { icon: "🗺️", name: "Ứng dụng GIS lập bản đồ ô nhiễm", desc: "Mô phỏng sự lan truyền chất ô nhiễm trong không khí và nguồn nước ngầm" },
                    { icon: "📋", name: "Đánh giá tác động môi trường (ĐTM)", desc: "Khảo sát hiện trạng và viết báo cáo thẩm định môi trường cho các dự án xây dựng" },
                    { icon: "🌱", name: "Kiểm kê khí nhà kính & Báo cáo ESG", desc: "Đo lường dấu chân carbon (Carbon Footprint) để doanh nghiệp đạt chứng chỉ xuất khẩu xanh" }
                ]
            },
            harshRealities: [
                { icon: "📉", title: "Thị trường việc làm trong nước chưa rộng mở bằng khối kinh tế", desc: "Nhiều doanh nghiệp nhỏ vẫn chưa mặn mà đầu tư cho xử lý môi trường do chi phí cao, dẫn đến số lượng việc làm chuyên sâu còn hạn chế." },
                { icon: "☣️", title: "Thường xuyên lấy mẫu hiện trường ở các khu vực ô nhiễm", desc: "Kỹ sư phải trực tiếp đến bãi rác, cống xả thải công nghiệp, kênh rạch ô nhiễm để lấy mẫu phân tích bất kể thời tiết nắng mưa." },
                { icon: "✂️", title: "Rào cản ngân sách khi doanh nghiệp khó khăn", desc: "Khi kinh tế suy thoái, ngân sách dành cho các hoạt động môi trường và phát triển bền vững thường bị doanh nghiệp cắt giảm đầu tiên." }
            ],
            salary: {
                entry: "7 – 11 Triệu / tháng",
                experienced: "20 – 35 Triệu / tháng",
                multiplier: "×2.8",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Chuyên gia tư vấn chứng chỉ Carbon và chuyên viên ESG cho các tập đoàn đa quốc gia có thể nhận mức thu nhập 40–60 triệu/tháng.",
                entryBarPercent: 28,
                expBarPercent: 76
            },
            closingQuestion: "Bạn có sẵn sàng đứng ra bảo vệ môi trường sống tự nhiên trước sức ép của sự phát triển công nghiệp hóa không?"
        },

        "Luật / Ngoại giao & Khoa học xã hội": {
            id: "luat_ng",
            name: "Luật / Ngoại giao & Khoa học xã hội",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Khối xét tuyển truyền thống", isPrimary: false },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Luật thương mại quốc tế", isPrimary: false },
                { code: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Khối truyền thống", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Ngữ văn & Tư duy phản biện logic — Đòi hỏi khả năng đọc hiểu khối lượng văn bản luật khổng lồ, diễn đạt câu chữ chặt chẽ không có kẽ hở.",
            coreSubjectAlert: {
                subject: "Ngữ văn & Tư duy ngôn ngữ logic",
                reason: "Một dấu phẩy hoặc một từ ngữ dùng sai trong hợp đồng kinh tế có thể gây thiệt hại hàng tỷ đồng và kéo theo tranh chấp kéo dài nhiều năm."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Luật Hà Nội, ĐH Luật TP.HCM, Học viện Ngoại giao điểm chuẩn rất cao (26-28.5đ). ĐH Công đoàn, ĐH Mở, Khoa Luật ĐHQG là phương án dự phòng an toàn.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Chú ý phương thức xét tuyển riêng bằng chứng chỉ tiếng Anh (IELTS từ 6.5 trở lên) kết hợp học bạ các trường chuyên."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Lý luận Nhà nước", desc: "Lý luận chung về Nhà nước & Pháp luật, Lịch sử nhà nước pháp luật, Triết học Mác - Lênin." },
                    { year: "Năm 2", stage: "Các ngành luật cơ bản", desc: "Luật Dân sự, Luật Hình sự, Luật Hành chính, Luật Đất đai, Tiếng Anh pháp lý." },
                    { year: "Năm 3", stage: "Luật kinh tế & Tố tụng", desc: "Luật Doanh nghiệp, Luật Thương mại quốc tế, Luật Tố tụng dân sự/hình sự, Kỹ năng soạn thảo hợp đồng." },
                    { year: "Năm 4", stage: "Thực hành phiên tòa & Thực tập", desc: "Tham gia diễn án phiên tòa giả định (Moot Court), Thực tập tại văn phòng luật sư hoặc tòa án." }
                ],
                plainExplanation: "Người bảo vệ công lý và lá chắn pháp lý cho doanh nghiệp: am hiểu các bộ luật, tư vấn phòng ngừa rủi ro hợp đồng, đại diện bảo vệ quyền lợi thân chủ trước tòa án và trọng tài.",
                tools: ["Cơ sở dữ liệu Văn bản Pháp luật (Thư viện Pháp luật)", "Hệ thống Quản lý án điện tử", "Phần mềm so sánh hợp đồng", "LexisNexis"],
                skills: [
                    { icon: "⚖️", name: "Tư duy phản biện & Lập luận sắc bén", desc: "Phát hiện kẽ hở logic trong lời khai đối phương và viện dẫn điều luật chuẩn xác" },
                    { icon: "📝", name: "Kỹ năng soạn thảo hợp đồng & văn bản", desc: "Viết các điều khoản pháp lý chặt chẽ, lường trước mọi tình huống tranh chấp" },
                    { icon: "🗣️", name: "Tranh tụng & Hùng biện trước công chúng", desc: "Trình bày luận điểm tự tin, đĩnh đạc và thuyết phục hội đồng xét xử" },
                    { icon: "🔍", name: "Tra cứu & Giải thích áp dụng pháp luật", desc: "Cập nhật nhanh chóng hàng trăm nghị định, thông tư mới ban hành để tư vấn đúng" }
                ]
            },
            harshRealities: [
                { icon: "📖", title: "Học thuộc và cập nhật hàng trăm bộ luật biến đổi liên tục", desc: "Hệ thống văn bản luật pháp sửa đổi hàng năm; ngừng đọc văn bản mới vài tháng là có thể áp dụng sai luật đã hết hiệu lực." },
                { icon: "⏳", title: "Cần thêm ít nhất 2 năm đào tạo tư pháp để có chứng chỉ hành nghề", desc: "Tốt nghiệp đại học chỉ là cử nhân luật; muốn làm luật sư phải học thêm 1 năm tại Học viện Tư pháp + 1 năm tập sự + thi đỗ kỳ thi quốc gia." },
                { icon: "🧠", title: "Áp lực tâm lý nặng nề khi đối diện tranh chấp", desc: "Thường xuyên phải giải quyết các vụ kiện tụng gay gắt, tranh chấp tài sản gia đình hoặc các vụ án hình sự phức tạp." }
            ],
            salary: {
                entry: "7 – 12 Triệu / tháng",
                experienced: "25 – 50 Triệu / tháng",
                multiplier: "×3.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Luật sư chuyên ngành M&A (mua bán sáp nhập) hoặc Trọng tài thương mại quốc tế tính phí tư vấn theo giờ lên tới hàng trăm USD/giờ.",
                entryBarPercent: 30,
                expBarPercent: 88
            },
            closingQuestion: "Bạn có dám đứng lên bảo vệ lẽ phải và dùng lý lẽ sắc bén để đấu tranh cho sự công bằng trước mọi áp lực không?"
        },

        "Công an & Quân đội": {
            id: "ca_qd",
            name: "Công an & Quân đội",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Khối Kỹ thuật nghiệp vụ", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Xét tuyển rộng rãi", isPrimary: false },
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Nghiệp vụ An ninh - Cảnh sát", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số ngành đào tạo", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Khối Kỹ thuật nghiệp vụ", isPopular: true },
                { combo: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Nghiệp vụ Cảnh sát", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Một số ngành", isPopular: false }
            ],
            coreSubjectWarning: "Thể lực chuẩn & Kỷ luật tự giác — Yêu cầu bắt buộc về chiều cao, thị lực, sức bền thể chất và vượt qua vòng sơ tuyển lý lịch chính trị khắt khe.",
            coreSubjectAlert: {
                subject: "Sức khỏe loại 1 & Kỷ luật thép",
                reason: "Phải trải qua kiểm tra thể lực nghiêm ngặt (chạy 100m, co tay xà đơn, bật xa) và xác minh lý lịch 3 đời nghiêm ngặt trước khi nộp hồ sơ."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Học viện An ninh, Học viện Cảnh sát, Học viện Kỹ thuật Quân sự chỉ tiêu có hạn và điểm chuẩn thường rất cao.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Bắt buộc đăng ký sơ tuyển tại Công an hoặc Ban Chỉ huy Quân sự cấp quận/huyện từ tháng 3 đến tháng 4 hàng năm."
            },
            curriculum: {
                duration: "4 – 5 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Huấn luyện tân binh & Điều lệnh", desc: "Điều lệnh đội ngũ, Bắn súng quân dụng, Bơi vũ trang, Võ thuật CAND/Quân đội." },
                    { year: "Năm 2", stage: "Kiến thức pháp luật & Nghiệp vụ cơ bản", desc: "Pháp luật đại cương, Lý luận nghiệp vụ, Bảo vệ an ninh quốc gia, Chiến thuật chiến đấu." },
                    { year: "Năm 3", stage: "Nghiệp vụ chuyên ngành", desc: "Trinh sát điều tra tội phạm, Kỹ thuật hình sự, Quản lý hành chính về trật tự xã hội." },
                    { year: "Năm 4-5", stage: "Thực tập đơn vị chiến đấu", desc: "Thực tập tại Công an các tỉnh/thành phố hoặc các quân đoàn, Hoàn thành đồ án tốt nghiệp." }
                ],
                plainExplanation: "Thanh kiếm và lá chắn bảo vệ Tổ quốc và bình yên cho nhân dân: giữ gìn an ninh trật tự xã hội, điều tra phá án tội phạm và sẵn sàng chiến đấu bảo vệ biên cương, vùng trời biển đảo.",
                tools: ["Vũ khí quân dụng tiêu chuẩn", "Thiết bị giám sát an ninh", "Hệ thống trích xuất dữ liệu camera", "Phương tiện thông tin tác chiến liên lạc"],
                skills: [
                    { icon: "🥋", name: "Võ thuật tác chiến & Bắn súng chuẩn xác", desc: "Thành thạo các đòn thế khống chế đối tượng nguy hiểm và sử dụng vũ khí an toàn" },
                    { icon: "🧠", name: "Tư duy trinh sát & Phân tích tâm lý tội phạm", desc: "Thu thập manh mối, xâu chuỗi sự kiện và phán đoán hướng tẩu thoát của tội phạm" },
                    { icon: "🛡️", name: "Tuyệt đối phục tùng mệnh lệnh chỉ huy", desc: "Kỷ luật sắt đá, sẵn sàng lên đường nhận nhiệm vụ bất kể ngày đêm hay địa bàn nguy hiểm" },
                    { icon: "🤝", name: "Công tác dân vận & Gắn bó nhân dân", desc: "Thấu hiểu đời sống nhân dân, xây dựng phong trào toàn dân bảo vệ an ninh Tổ quốc" }
                ]
            },
            harshRealities: [
                { icon: "🎖️", title: "Kỷ luật quân ngũ nghiêm ngặt 24/7, hạn chế xuất cảnh", desc: "Sống hoàn toàn trong môi trường doanh trại quân đội; mọi hành vi phát ngôn, đi lại đều phải xin phép và không được tự do xuất cảnh." },
                { icon: "🎒", title: "Thường xuyên điều động công tác xa nhà theo lệnh phân công", desc: "Sau khi tốt nghiệp sẽ được Bộ điều động công tác theo nhu cầu nhiệm vụ; không được tự chọn nơi làm việc như các ngành dân sự." },
                { icon: "⚠️", title: "Hiểm nguy, rủi ro trực tiếp khi thực hiện nhiệm vụ", desc: "Đối mặt trực tiếp với tội phạm nguy hiểm, buôn ma túy có vũ khí hoặc cứu hộ trong bão lũ thiên tai bất chấp hiểm nguy." }
            ],
            salary: {
                entry: "8 – 12 Triệu / tháng",
                experienced: "20 – 35 Triệu / tháng",
                multiplier: "×2.5",
                note: "Chỉ để tham khảo: Lương được chi trả theo cấp bậc hàm sĩ quan, thâm niên và phụ cấp trách nhiệm đặc thù của lực lượng vũ trang nhân dân.",
                entryBarPercent: 30,
                expBarPercent: 80
            },
            closingQuestion: "Bạn có sẵn sàng chấp nhận gác lại sự tự do cá nhân để khoác lên mình màu áo danh dự và cống hiến trọn đời cho bình yên Tổ quốc không?"
        },

        "Sư phạm & Quản lý giáo dục": {
            id: "sp_gd",
            name: "Sư phạm & Quản lý giáo dục",
            combos: [
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Sư phạm Xã hội", isPrimary: true },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Sư phạm Tự nhiên", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Sư phạm Ngoại ngữ / Tiểu học", isPrimary: false },
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Sư phạm Hóa - Sinh", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Sư phạm Tự nhiên", isPopular: true },
                { combo: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Sư phạm Xã hội", isPopular: false }
            ],
            coreSubjectWarning: "Môn chuyên ngành giảng dạy & Ngữ văn — Nền tảng kiến thức môn học phải thật xuất sắc kết hợp năng lực truyền đạt ngôn từ truyền cảm hứng.",
            coreSubjectAlert: {
                subject: "Môn chuyên ngành & Kỹ năng sư phạm",
                reason: "Không chỉ giỏi kiến thức môn học mà còn phải biết phương pháp sư phạm tâm lý để giảng dạy cho học sinh hiểu và hào hứng học tập."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Sư phạm Hà Nội, ĐH Sư phạm TP.HCM điểm chuẩn rất cao (25-28đ). Các trường ĐH Sư phạm Huế, Thái Nguyên, Cần Thơ có điểm chuẩn vừa tầm hơn.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Sinh viên sư phạm được miễn học phí và hỗ trợ sinh hoạt phí 3.63 triệu/tháng theo Nghị định 116 của Chính phủ."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Tâm lý học lứa tuổi", desc: "Tâm lý học sư phạm, Giáo dục học đại cương, Nhập môn chuyên ngành đào tạo." },
                    { year: "Năm 2", stage: "Kiến thức chuyên ngành sâu", desc: "Các học phần chuyên môn sâu môn học, Ứng dụng công nghệ thông tin trong dạy học." },
                    { year: "Năm 3", stage: "Phương pháp giảng dạy & Thực hành", desc: "Lý luận dạy học bộ môn, Thiết kế giáo án (Kế hoạch bài dạy), Tập giảng dạy thử nghiệm." },
                    { year: "Năm 4", stage: "Thực tập sư phạm tại trường phổ thông", desc: "Thực tập chủ nhiệm và giảng dạy thực tế tại trường THPT/THCS, Khóa luận tốt nghiệp." }
                ],
                plainExplanation: "Kỹ sư tâm hồn nuôi dưỡng tương lai: trang bị kiến thức bộ môn, phương pháp giáo dục hiện đại và đồng hành định hình nhân cách cho thế hệ trẻ.",
                tools: ["Canva for Education", "Kahoot! / Quizizz", "Google Classroom", "MS PowerPoint nâng cao", "Phần mềm mô phỏng thí nghiệm ảo"],
                skills: [
                    { icon: "🗣️", name: "Năng lực thuyết trình & Truyền cảm hứng", desc: "Truyền đạt kiến thức sinh động, hấp dẫn, thu hút sự tập trung của học trò" },
                    { icon: "📝", name: "Thiết kế giáo án đổi mới sáng tạo", desc: "Biến các bài học khô khan thành các hoạt động dự án, trò chơi tương tác thú vị" },
                    { icon: "❤️", name: "Thấu hiểu tâm lý lứa tuổi học sinh", desc: "Lắng nghe tâm tư, nhận diện sớm các vấn đề tâm lý học đường để kịp thời hỗ trợ" },
                    { icon: "💻", name: "Ứng dụng công nghệ số dạy học (EdTech)", desc: "Tích hợp công cụ trực tuyến, video bài giảng để mở rộng không gian học tập" }
                ]
            },
            harshRealities: [
                { icon: "📑", title: "Áp lực lớn từ phụ huynh, nhà trường và thi cử", desc: "Gánh vác kỳ vọng điểm số từ phụ huynh, áp lực thành tích thi đua của nhà trường và cải cách chương trình giáo dục liên tục." },
                { icon: "📉", title: "Mức lương ngạch viên chức khởi điểm khiêm tốn", desc: "Lương giáo viên mới ra trường theo hệ số nhà nước chỉ khoảng 6–8 triệu/tháng; cần thời gian phấn đấu tích lũy thâm niên." },
                { icon: "👁️", title: "Trách nhiệm mô phạm, hành vi bị soi xét khắt khe", desc: "Người thầy luôn phải chuẩn mực trong từng lời ăn tiếng nói, trang phục và cả cách ứng xử trên mạng xã hội ngoài giờ học." }
            ],
            salary: {
                entry: "6 – 9 Triệu / tháng",
                experienced: "18 – 35 Triệu / tháng",
                multiplier: "×2.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Giáo viên giỏi dạy trường quốc tế, trường tư thục chất lượng cao hoặc luyện thi trực tuyến có thể đạt mức 25–40 triệu/tháng.",
                entryBarPercent: 25,
                expBarPercent: 75
            },
            closingQuestion: "Bạn có tình yêu thương trẻ con và sự kiên nhẫn vô bờ để giảng giải lại nhiều lần một bài toán cho học sinh chưa hiểu không?"
        },

        "Tâm lý học & Dịch vụ tham vấn / Xã hội": {
            id: "tl_xh",
            name: "Tâm lý học & Dịch vụ tham vấn / Xã hội",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Tâm lý lâm sàng", isPrimary: false },
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Một số trường xét tuyển", isPrimary: false },
                { code: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Tâm lý học đường", isPopular: false },
                { combo: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Ngữ văn & Sinh học thần kinh — Nền tảng thấu cảm cảm xúc con người kết hợp cùng kiến thức sinh học về chất dẫn truyền thần kinh não bộ.",
            coreSubjectAlert: {
                subject: "Ngữ văn (Thấu cảm) & Sinh học thần kinh",
                reason: "Khả năng lắng nghe không phán xét và phân tích các triệu chứng rối loạn lo âu, trầm cảm dựa trên cơ chế tâm sinh lý."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH KHXH&NV Hà Nội và TP.HCM, ĐH Sư phạm điểm chuẩn dao động từ 24 – 27 điểm.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Nhu cầu chuyên viên tư vấn tâm lý học đường theo thông tư mới của Bộ Giáo dục đang tăng mạnh."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Lịch sử tâm lý", desc: "Tâm lý học đại cương, Giải phẫu sinh lý thần kinh, Lịch sử các trường phái tâm lý." },
                    { year: "Năm 2", stage: "Tâm lý phát triển & Xã hội", desc: "Tâm lý học phát triển lứa tuổi, Tâm lý học xã hội, Tâm lý học nhân cách, Thống kê SPSS." },
                    { year: "Năm 3", stage: "Chẩn đoán & Trắc nghiệm tâm lý", desc: "Tâm bệnh học, Kỹ thuật trắc nghiệm tâm lý (WISC, WAIS, MMPI), Kỹ năng tham vấn cơ bản." },
                    { year: "Năm 4", stage: "Thực hành trị liệu & Khóa luận", desc: "Tham vấn tâm lý học đường/lâm sàng, Thực tập tại bệnh viện tâm thần hoặc trung tâm trị liệu." }
                ],
                plainExplanation: "Người gỡ rối tơ lòng và chữa lành tâm hồn: lắng nghe không phán xét, đánh giá các sang chấn tâm lý và hỗ trợ thân chủ tìm lại sự cân bằng, nội lực bên trong.",
                tools: ["Bộ trắc nghiệm WISC/WAIS", "Thang đo trầm cảm Beck/DASS-21", "Bộ bài trị liệu cảm xúc", "SPSS", "Mô hình phòng trị liệu cát"],
                skills: [
                    { icon: "👂", name: "Lắng nghe tích cực & Không phán xét", desc: "Tạo không gian an toàn tuyệt đối để thân chủ thoải mái bộc bạch mọi nỗi đau thầm kín" },
                    { icon: "🧠", name: "Đánh giá & Chẩn đoán tâm lý", desc: "Sử dụng các công cụ thang đo chuẩn quốc tế để nhận diện mức độ lo âu, trầm cảm" },
                    { icon: "💡", name: "Kỹ năng tham vấn & Liệu pháp CBT", desc: "Dẫn dắt thân chủ nhận diện nhận thức sai lệch và thay đổi hành vi tích cực hơn" },
                    { icon: "🛡️", name: "Kỷ luật bảo mật thông tin thân chủ", desc: "Tuân thủ nghiêm ngặt nguyên tắc đạo đức nghề nghiệp về giữ kín danh tính thân chủ" }
                ]
            },
            harshRealities: [
                { icon: "🌪️", title: "Ô nhiễm cảm xúc thứ cấp (Secondary Trauma)", desc: "Thường xuyên lắng nghe những câu chuyện bi thương, trầm cảm, sang chấn của người khác khiến chuyên viên dễ bị quá tải cảm xúc tiêu cực." },
                { icon: "📜", title: "Khung pháp lý cấp chứng chỉ hành nghề tại VN chưa hoàn thiện", desc: "Nghề tâm lý trị liệu tại Việt Nam còn mới mẻ; việc đào tạo sau đại học và cấp phép hành nghề còn nhiều điểm chưa đồng bộ." },
                { icon: "📉", title: "Khó xây dựng tệp khách hàng trả phí cao lúc mới ra trường", desc: "Khách hàng thường tìm đến các chuyên gia lâu năm có nhiều kinh nghiệm; người mới ra trường phải kiên trì tích lũy giờ thực hành có giám sát." }
            ],
            salary: {
                entry: "7 – 11 Triệu / tháng",
                experienced: "22 – 40 Triệu / tháng",
                multiplier: "×2.8",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Chuyên gia tư vấn tâm lý độc lập uy tín tính phí từ 500,000 – 1,500,000 đ/giờ tham vấn.",
                entryBarPercent: 28,
                expBarPercent: 78
            },
            closingQuestion: "Bạn có đôi tai đủ kiên nhẫn và trái tim đủ ấm áp để lắng nghe những nỗi đau sâu kín nhất của người khác mà không vội vàng phán xét không?"
        },

        "Truyền thông / Báo chí & Quan hệ công chúng (PR)": {
            id: "tt_pr",
            name: "Truyền thông / Báo chí & Quan hệ công chúng (PR)",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất (75% chỉ tiêu)", isPrimary: true },
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Khối xét tuyển truyền thống", isPrimary: false },
                { code: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Nhiều trường KHXH&NV", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Khối truyền thống", isPopular: true },
                { combo: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Ngữ văn & Tiếng Anh — Khả năng sáng tạo ngôn từ sắc bén, tư duy kể chuyện (Storytelling) hấp dẫn và nhạy bén với tin tức thời sự.",
            coreSubjectAlert: {
                subject: "Ngữ văn (Viết lách) & Tiếng Anh",
                reason: "Viết thông cáo báo chí, kịch bản video và xử lý khủng hoảng truyền thông đòi hỏi khả năng làm chủ ngôn ngữ tinh tế và nhanh nhạy."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Học viện Báo chí & Tuyên truyền, ĐH KHXH&NV điểm chuẩn rất cao (26-28.5đ). ĐH Văn hóa, ĐH Thăng Long, ĐH FPT là phương án dự phòng uy tín.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Một số chuyên ngành Báo chí có tổ hợp thi năng khiếu Báo chí hoặc phỏng vấn portfolio sáng tạo."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Lý luận truyền thông", desc: "Lý thuyết truyền thông đại chúng, Xã hội học truyền thông, Nhập môn Báo chí & PR." },
                    { year: "Năm 2", stage: "Kỹ năng sáng tạo nội dung", desc: "Viết tin/bài báo, Kỹ thuật chụp ảnh báo chí, Biên tập video ngắn, Tổ chức họp báo." },
                    { year: "Năm 3", stage: "Chiến dịch PR & Quản trị khủng hoảng", desc: "Lập kế hoạch chiến dịch PR, Quan hệ với báo giới, Quản trị khủng hoảng truyền thông mạng xã hội." },
                    { year: "Năm 4", stage: "Thực tập Agency & Khóa luận", desc: "Thực tập tại cơ quan báo chí hoặc PR Agency, Hoàn thành đồ án chiến dịch truyền thông." }
                ],
                plainExplanation: "Người định hình dòng chảy thông tin: kể những câu chuyện truyền cảm hứng, xây dựng hình ảnh thương hiệu uy tín trong mắt công chúng và dập tắt các cuộc khủng hoảng tin đồn.",
                tools: ["CapCut / Premiere Pro", "Canva", "Social Listening Tools (Buzzmetrics, Younet)", "Mailchimp", "WordPress CMS"],
                skills: [
                    { icon: "✍️", name: "Sáng tạo nội dung & Copywriting", desc: "Viết thông điệp sắc sảo, bắt trúng tâm lý độc giả và tạo hiệu ứng lan truyền (viral)" },
                    { icon: "🎙️", name: "Quan hệ báo giới & Phát ngôn", desc: "Xây dựng mạng lưới quan hệ bền chặt với các nhà báo và cơ quan truyền thông" },
                    { icon: "🚨", name: "Quản trị khủng hoảng truyền thông", desc: "Bình tĩnh phản ứng nhanh, soạn thảo thông cáo chính xác để bảo vệ danh tiếng" },
                    { icon: "📊", name: "Đo lường dư luận (Social Listening)", desc: "Theo dõi chỉ số cảm xúc người dùng (Sentiment) và phân tích luồng thảo luận mạng xã hội" }
                ]
            },
            harshRealities: [
                { icon: "⚡", title: "Áp lực 'cháy bài', chạy sự kiện bất kể ngày đêm hay lễ tết", desc: "Tin tức diễn ra 24/7; khi có sự kiện nóng hoặc sự cố phát sinh, người làm truyền thông phải làm việc ngay lập tức không kể nửa đêm." },
                { icon: "🚨", title: "Khủng hoảng truyền thông ập đến bất ngờ, căng thẳng tinh thần", desc: "Một bài đăng sai sót có thể thổi bùng làn sóng tẩy chay dữ dội từ cộng đồng mạng chỉ sau vài giờ, gây áp lực nghẹt thở." },
                { icon: "🔄", title: "Xu hướng mạng xã hội đổi theo tuần, đòi hỏi liên tục đổi mới", desc: "Trend TikTok và thuật toán thay đổi chóng mặt; nếu không liên tục làm mới phong cách kể chuyện sẽ rất nhanh bị người xem lãng quên." }
            ],
            salary: {
                entry: "8 – 13 Triệu / tháng",
                experienced: "25 – 48 Triệu / tháng",
                multiplier: "×3.2",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Giám đốc truyền thông (PR Director) tại các tập đoàn lớn có mức đãi ngộ trên 50 triệu/tháng.",
                entryBarPercent: 30,
                expBarPercent: 88
            },
            closingQuestion: "Bạn có chịu được áp lực phải sáng tạo liên tục và sẵn sàng thức dậy lúc 2 giờ sáng để xử lý một sự cố truyền thông nóng không?"
        },

        "Thiết kế đồ họa / Mỹ thuật số & Đa phương tiện": {
            id: "tk_dh",
            name: "Thiết kế đồ họa / Mỹ thuật số & Đa phương tiện",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Thiết kế đồ họa số", isPrimary: true },
                { code: "V00", subjects: "Toán · Vật lí · Vẽ mỹ thuật", tag: "Xét tuyển năng khiếu", isPrimary: false },
                { code: "H00", subjects: "Ngữ văn · Hình họa · Bố cục màu", tag: "Khối mỹ thuật", isPrimary: false },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Multimedia / UI-UX", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "H00", subjects: "Ngữ văn · Hình họa · Bố cục màu", tag: "Khối năng khiếu", isPopular: true },
                { combo: "V00", subjects: "Toán · Vật lí · Vẽ mỹ thuật", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Tư duy thị giác & Thẩm mỹ màu sắc — Khả năng cảm thụ cái đẹp, nguyên lý thị giác cân bằng, phối màu và nghệ thuật chữ (Typography).",
            coreSubjectAlert: {
                subject: "Tư duy thẩm mỹ & Bộ công cụ thiết kế số",
                reason: "Không chỉ vẽ đẹp bằng tay mà quan trọng là tư duy biến yêu cầu mơ hồ của khách hàng thành sản phẩm hình ảnh có tính thẩm mỹ và ứng dụng cao."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Mỹ thuật Công nghiệp, ĐH Kiến trúc, ĐH RMIT, ĐH FPT, ĐH Hoa Sen đều có thế mạnh rất lớn về đào tạo Thiết kế đồ họa.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Nhiều trường công nghệ xét tuyển kết hợp điểm thi tốt nghiệp khối D01/A01 với Portfolio tác phẩm tự vẽ."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Mỹ thuật cơ bản & Nguyên lý thị giác", desc: "Hình họa chì, Bánh xe màu sắc, Bố cục thị giác, Nghệ thuật chữ (Typography)." },
                    { year: "Năm 2", stage: "Bộ công cụ Adobe & Thiết kế 2D", desc: "Thành thạo Photoshop, Illustrator, Thiết kế nhận diện thương hiệu (Logo, Bao bì)." },
                    { year: "Năm 3", stage: "Giao diện số UI/UX & Đa phương tiện", desc: "Thiết kế ứng dụng di động trên Figma, Kỹ xảo chuyển động After Effects, Dựng video." },
                    { year: "Năm 4", stage: "Xây dựng Portfolio & Tốt nghiệp", desc: "Xây dựng đồ án thương hiệu hoàn chỉnh, Thực tập tại Design Agency, Bảo vệ Portfolio." }
                ],
                plainExplanation: "Kiến trúc sư của mắt nhìn: truyền tải thông điệp bằng hình ảnh, màu sắc và kiểu chữ — từ logo thương hiệu, banner quảng cáo, giao diện ứng dụng app điện thoại đến hoạt hình 2D/3D.",
                tools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "After Effects", "Premiere Pro", "Blender 3D", "Wacom"],
                skills: [
                    { icon: "🎨", name: "Cảm thụ màu sắc & Typography", desc: "Phối hợp màu sắc hài hòa và phân cấp thị giác kiểu chữ dẫn dắt ánh nhìn" },
                    { icon: "📱", name: "Thiết kế giao diện UI/UX", desc: "Xây dựng trải nghiệm ứng dụng thông minh, thân thiện và đẹp mắt trên Figma" },
                    { icon: "🎬", name: "Đồ họa động (Motion Graphics)", desc: "Tạo chuyển động sinh động cho các yếu tố đồ họa trong video quảng cáo" },
                    { icon: "💡", name: "Xây dựng câu chuyện thương hiệu", desc: "Biến giá trị cốt lõi của doanh nghiệp thành bộ nhận diện hình ảnh độc bản" }
                ]
            },
            harshRealities: [
                { icon: "🔄", title: "Vòng lặp sửa file 'lần cuối n' đến kiệt sức", desc: "Phải rèn luyện sự bình thản khi ý tưởng tâm huyết bị sếp hoặc khách hàng yêu cầu chỉnh sửa nhiều lần vì cảm tính cá nhân." },
                { icon: "🔥", title: "Khủng hoảng cạn kiệt ý tưởng (Creative Burnout)", desc: "Sáng tạo liên tục theo hạn chót (deadline) khiến đầu óc dễ bị căng thẳng, mất nguồn cảm hứng và chán ghét việc cầm bút." },
                { icon: "🤖", title: "Áp lực cạnh tranh từ các công cụ AI tạo ảnh", desc: "Midjourney và Stable Diffusion vẽ ảnh rất nhanh; người thiết kế đồ họa buộc phải nâng tầm tư duy chiến lược thương hiệu chứ không chỉ cắt ghép ảnh đơn thuần." }
            ],
            salary: {
                entry: "8 – 14 Triệu / tháng",
                experienced: "25 – 45 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Designer làm Freelance cho thị trường quốc tế hoặc Senior UI/UX Designer có mức thu nhập 35–60 triệu/tháng.",
                entryBarPercent: 32,
                expBarPercent: 86
            },
            closingQuestion: "Bạn có đủ kiên nhẫn để mỉm cười lưu lại file thiết kế mang tên 'ban-chinh-sua-lan-cuoi-cung-that-su.ai' không?"
        },

        "Âm nhạc, Biểu diễn & Nghệ thuật sân khấu": {
            id: "am_nhac",
            name: "Âm nhạc, Biểu diễn & Nghệ thuật sân khấu",
            combos: [
                { code: "N00", subjects: "Ngữ văn · Năng khiếu Âm nhạc 1 · Năng khiếu Âm nhạc 2", tag: "Xét tuyển Nhạc viện", isPrimary: true },
                { code: "S00", subjects: "Ngữ văn · Năng khiếu Sân khấu 1 · Năng khiếu Sân khấu 2", tag: "Sân khấu Điện ảnh", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Quản lý văn hóa nghệ thuật", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "N00", subjects: "Ngữ văn · Năng khiếu Âm nhạc 1 · Năng khiếu Âm nhạc 2", tag: "Khối Nhạc viện", isPopular: true },
                { combo: "S00", subjects: "Ngữ văn · Năng khiếu Sân khấu 1 · Năng khiếu Sân khấu 2", tag: "Khối Sân khấu Điện ảnh", isPopular: true }
            ],
            coreSubjectWarning: "Năng khiếu chuyên biệt & Cảm thụ nghệ thuật — Đòi hỏi năng khiếu bẩm sinh kết hợp khổ luyện kỹ thuật thanh nhạc, nhạc cụ hoặc diễn xuất từ nhỏ.",
            coreSubjectAlert: {
                subject: "Năng khiếu thẩm âm & Biểu cảm sân khấu",
                reason: "Các môn thi năng khiếu chuyên môn có barem chấm điểm rất khắt khe, đòi hỏi kỹ thuật vững vàng và bản lĩnh làm chủ sân khấu."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Học viện Âm nhạc Quốc gia VN, ĐH Sân khấu - Điện ảnh Hà Nội/TP.HCM, Nhạc viện TP.HCM là cái nôi nghệ thuật hàng đầu.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Thí sinh phải nộp hồ sơ đăng ký thi tuyển các vòng năng khiếu trực tiếp sớm hơn các trường đại học thông thường."
            },
            curriculum: {
                duration: "4 – 5 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Kỹ thuật cơ bản & Ký xướng âm", desc: "Ký xướng âm, Hòa âm căn bản, Kỹ thuật thanh nhạc/nhạc cụ cơ bản, Lịch sử âm nhạc." },
                    { year: "Năm 2", stage: "Phát triển kỹ năng biểu diễn", desc: "Thanh nhạc nâng cao, Kỹ xảo biểu cảm hình thể, Hòa tấu thính phòng, Tiếng nói sân khấu." },
                    { year: "Năm 3", stage: "Phong cách chuyên sâu & Sáng tác", desc: "Xử lý tác phẩm kinh điển, Sản xuất âm nhạc số (DAW), Diễn xuất trước ống kính." },
                    { year: "Năm 4-5", stage: "Chương trình báo cáo & Tốt nghiệp", desc: "Dựng vở diễn tốt nghiệp hoặc tổ chức Recital hòa nhạc độc tấu trước hội đồng giám khảo." }
                ],
                plainExplanation: "Thắp sáng cảm xúc con người qua âm thanh và hình thể: làm chủ kỹ thuật biểu diễn chuyên nghiệp, sáng tác các tác phẩm âm nhạc lay động lòng người và tỏa sáng trên sân khấu.",
                tools: ["FL Studio / Logic Pro", "Micro thu âm condenser", "Đàn Piano / Nhạc cụ chuyên ngành", "Bàn mixer âm thanh", "Ableton Live"],
                skills: [
                    { icon: "🎵", name: "Cảm âm tuyệt đối & Xử lý giai điệu", desc: "Thẩm âm chuẩn xác cao độ, nhịp phách và hòa thanh phức tạp" },
                    { icon: "🎭", name: "Biểu cảm thấu cảm & Nhập vai", desc: "Biến hóa nội tâm, hóa thân trọn vẹn vào tính cách nhân vật trên sân khấu" },
                    { icon: "🎛️", name: "Sản xuất âm nhạc số hiện đại", desc: "Phối khí, làm beat và thu âm chuyên nghiệp trên các phần mềm DAW" },
                    { icon: "✨", name: "Bản lĩnh sân khấu & Tự tin trước đám đông", desc: "Tỏa ra năng lượng cuốn hút và làm chủ tình huống trực tiếp trước hàng nghìn khán giả" }
                ]
            },
            harshRealities: [
                { icon: "🎲", title: "Xác suất đào thải khốc liệt, chỉ tỷ lệ nhỏ đạt đỉnh vinh quang", desc: "Hàng nghìn người tốt nghiệp mỗi năm nhưng chỉ số ít nghệ sĩ có tên tuổi; độ cạnh tranh cực kỳ khắc nghiệt và phụ thuộc vào chữ duyên." },
                { icon: "📉", title: "Thu nhập bấp bênh theo mùa show và hợp đồng", desc: "Không có mức lương cố định hàng tháng; thu nhập phụ thuộc vào hợp đồng biểu diễn ngắn hạn, mùa lễ hội nhiều show và mùa vắng show." },
                { icon: "🤕", title: "Tập luyện thể chất/thanh nhạc khắc nghiệt, nguy cơ chấn thương nghề", desc: "Luyện giọng liên tục dễ gây hạt xơ dây thanh; diễn viên kịch/vũ công đối diện chấn thương khớp và dây chằng suốt đời." }
            ],
            salary: {
                entry: "5 – 10 Triệu / tháng (Không cố định)",
                experienced: "20 – 60+ Triệu / tháng",
                multiplier: "×3.5",
                note: "Chỉ để tham khảo: Thu nhập của nghệ sĩ dao động rất lớn, từ vài triệu khi mới ra trường diễn phụ cát-xê đến hàng trăm triệu mỗi show đối với nghệ sĩ có tên tuổi.",
                entryBarPercent: 25,
                expBarPercent: 85
            },
            closingQuestion: "Bạn có đủ đam mê cháy bỏng để kiên trì luyện tập hàng nghìn giờ trong phòng tập dù chưa biết ngày nào mình sẽ tỏa sáng không?"
        },

        "Thể thao & Khoa học vận động": {
            id: "tt_vd",
            name: "Thể thao & Khoa học vận động",
            combos: [
                { code: "T00", subjects: "Toán · Ngữ văn · Năng khiếu TDTT", tag: "Xét tuyển trường Thể thao", isPrimary: true },
                { code: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Y học thể thao", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Quản lý kinh doanh thể thao", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "T00", subjects: "Toán · Ngữ văn · Năng khiếu TDTT", tag: "Khối tuyển sinh chính", isPopular: true },
                { combo: "B00", subjects: "Toán · Hóa học · Sinh học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Sinh học & Thể chất bền bỉ — Đòi hỏi tố chất thể lực tốt, sức bền tim mạch và khả năng tiếp thu các kỹ thuật vận động nhanh nhẹn.",
            coreSubjectAlert: {
                subject: "Thể lực đỉnh cao & Sinh lý vận động",
                reason: "Kiểm tra năng khiếu thể thao bao gồm chạy cự ly, bật cao, dẻo dai và các bài test phản xạ vận động chuyên biệt."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Thể dục Thể thao Bắc Ninh, ĐH Sư phạm TDTT Hà Nội/TP.HCM là trung tâm đào tạo VĐV và HLV hàng đầu.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Thí sinh đoạt huy chương tại các giải vô địch quốc gia hoặc Hội khỏe Phù Đổng được ưu tiên tuyển thẳng."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Sinh lý thể thao", desc: "Giải phẫu học hệ vận động, Sinh lý học thể thao, Điền kinh cơ bản, Bơi lội." },
                    { year: "Năm 2", stage: "Nguyên lý huấn luyện & Dinh dưỡng", desc: "Lý luận và phương pháp giáo dục thể chất, Dinh dưỡng thể thao, Sơ cứu chấn thương." },
                    { year: "Năm 3", stage: "Chuyên sâu môn thể thao & Y học phục hồi", desc: "Huấn luyện chuyên sâu (Bóng đá/Bóng rổ/Cầu lông/Fitness), Phục hồi chức năng vận động." },
                    { year: "Năm 4", stage: "Thực tập huấn luyện & Tốt nghiệp", desc: "Thực tập huấn luyện tại các CLB thể thao hoặc trường học, Bảo vệ khóa luận tốt nghiệp." }
                ],
                plainExplanation: "Tối ưu hóa tiềm năng cơ thể con người: đào tạo vận động viên thi đấu đỉnh cao, hướng dẫn tập luyện phục hồi thể lực và quản lý các trung tâm thể hình, thể thao chuyên nghiệp.",
                tools: ["Đồng hồ bấm giờ thể thao", "Máy đo nhịp tim Polar", "Thiết bị phân tích cơ thể InBody", "Dây kháng lực & Tạ chuẩn Olympic", "Dụng cụ vật lý trị liệu"],
                skills: [
                    { icon: "🏋️", name: "Thiết kế giáo án huấn luyện thể lực", desc: "Xây dựng chu kỳ tập luyện khoa học (Periodization) giúp học viên tăng cơ, giảm mỡ" },
                    { icon: "🩹", name: "Xử lý & Phục hồi chấn thương thể thao", desc: "Băng bó ép cơ, chườm lạnh sơ cứu R.I.C.E và hướng dẫn bài tập phục hồi khớp" },
                    { icon: "🥗", name: "Tư vấn dinh dưỡng vận động", desc: "Tính toán lượng calo, macro (protein, carb, fat) phù hợp với cường độ tập luyện" },
                    { icon: "🏆", name: "Tâm lý học thể thao & Động viên thi đấu", desc: "Xây dựng ý chí thép và giải tỏa căng thẳng tâm lý cho vận động viên trước giờ thi" }
                ]
            },
            harshRealities: [
                { icon: "⏳", title: "Tuổi thọ nghề thi đấu ngắn (Thường giải nghệ trước tuổi 32)", desc: "Đỉnh cao phong độ thể thao chỉ kéo dài khoảng 8–10 năm; sau đó vận động viên phải sớm chuyển hướng sang làm huấn luyện viên hoặc kinh doanh." },
                { icon: "🩹", title: "Nguy cơ chấn thương mãn tính đeo bám suốt đời", desc: "Đứt dây chằng chéo, thoái hóa khớp gối hoặc thoát vị đĩa đệm do cường độ tập luyện quá tải là nỗi ám ảnh thường trực." },
                { icon: "🥇", title: "Thu nhập phụ thuộc trực tiếp vào thành tích huy chương", desc: "Chỉ những VĐV đạt huy chương quốc tế mới có tiền thưởng và tài trợ lớn; phần đông VĐV phong trào có thu nhập khiêm tốn." }
            ],
            salary: {
                entry: "7 – 10 Triệu / tháng",
                experienced: "20 – 40 Triệu / tháng",
                multiplier: "×2.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Huấn luyện viên cá nhân (PT) uy tín tại các trung tâm thể hình cao cấp có thể đạt thu nhập 30–50 triệu/tháng nhờ hoa hồng dạy kèm.",
                entryBarPercent: 26,
                expBarPercent: 78
            },
            closingQuestion: "Bạn có sẵn sàng chấp nhận những giọt mồ hôi đau đớn và vết chấn thương mỗi ngày để theo đuổi lối sống thể thao đỉnh cao không?"
        },

        "Du lịch / Quản trị khách sạn & Dịch vụ F&B": {
            id: "dl_ks",
            name: "Du lịch / Quản trị khách sạn & Dịch vụ F&B",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất (75% chỉ tiêu)", isPrimary: true },
                { code: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Du lịch văn hóa", isPrimary: false },
                { code: "D15", subjects: "Ngữ văn · Địa lí · Tiếng Anh", tag: "Địa lý du lịch", isPrimary: false },
                { code: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Hướng dẫn viên du lịch", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Một số trường", isPopular: false },
                { combo: "C00", subjects: "Ngữ văn · Lịch sử · Địa lí", tag: "Khối truyền thống", isPopular: false }
            ],
            coreSubjectWarning: "Tiếng Anh giao tiếp & Ngoại hình — Ngoại ngữ là chìa khóa then chốt để phục vụ khách quốc tế và giao tiếp đa văn hóa linh hoạt.",
            coreSubjectAlert: {
                subject: "Tiếng Anh giao tiếp & Sự mến khách (Hospitality)",
                reason: "Ngành dịch vụ khách hàng đòi hỏi sự thân thiện, kỹ năng ứng biến tình huống khéo léo và phản xạ tiếng Anh tự nhiên trôi chảy."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Kinh tế Quốc dân, ĐH Hà Nội, ĐH Mở, ĐH Văn hóa, ĐH Kinh tế TP.HCM đều có dải điểm từ 20 – 26 điểm phù hợp nhiều năng lực.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Ưu tiên các trường có hệ thống phòng thực hành khách sạn chuẩn 5 sao và ký kết thực tập hưởng lương tại nước ngoài."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Địa lý du lịch", desc: "Địa lý du lịch Việt Nam & thế giới, Văn hóa ẩm thực, Tiếng Anh du lịch căn bản." },
                    { year: "Năm 2", stage: "Nghiệp vụ buồng phòng & Lễ tân", desc: "Nghiệp vụ tiền sảnh (Front Office), Quản trị buồng phòng (Housekeeping), Nghiệp vụ nhà hàng (F&B)." },
                    { year: "Năm 3", stage: "Quản trị lữ hành & Sự kiện", desc: "Thiết kế tour du lịch, Điều hành tour lữ hành, Tổ chức sự kiện MICE, Quản trị doanh thu khách sạn." },
                    { year: "Năm 4", stage: "Thực tập quản trị khách sạn", desc: "Thực tập quản lý tại các resort/khách sạn 4-5 sao quốc tế, Hoàn thành báo cáo tốt nghiệp." }
                ],
                plainExplanation: "Đại sứ của niềm vui và sự mến khách: mang đến trải nghiệm nghỉ dưỡng hoàn hảo cho du khách, điều hành chuỗi nhà hàng khách sạn 5 sao và dẫn dắt các chuyến du ngoạn khám phá thế giới.",
                tools: ["Hệ thống đặt phòng Opera PMS / Fidelio", "Amadeus / Sabre (Hệ thống vé máy bay)", "POS nhà hàng", "MS Excel doanh thu", "TripAdvisor / OTA Platforms"],
                skills: [
                    { icon: "🛎️", name: "Nghiệp vụ lễ tân & Quản trị tiền sảnh", desc: "Thực hiện thủ tục check-in/out chuyên nghiệp và giải quyết khiếu nại khách hàng khéo léo" },
                    { icon: "🗺️", name: "Thiết kế & Thuyết minh tour du lịch", desc: "Xây dựng lịch trình tour hấp dẫn và thuyết minh truyền cảm về văn hóa lịch sử" },
                    { icon: "🍷", name: "Nghệ thuật ẩm thực & Rượu vang (Sommelier)", desc: "Am hiểu cách phối hợp món ăn với rượu vang và quy chuẩn phục vụ bàn tiệc quốc tế" },
                    { icon: "🌐", name: "Giao tiếp liên văn hóa & Ngoại ngữ 2", desc: "Tự tin giao tiếp bằng tiếng Anh, tiếng Trung hoặc tiếng Hàn với du khách quốc tế" }
                ]
            },
            harshRealities: [
                { icon: "🎉", title: "Đi làm khi người khác đi chơi (Lễ, Tết, cuối tuần)", desc: "Mùa cao điểm du lịch chính là lúc bạn phải làm việc cường độ cao nhất; hầu như không có ngày nghỉ lễ bên gia đình." },
                { icon: "🏃", title: "Đứng liên tục 8–10 tiếng & Áp lực chiều lòng khách khó tính", desc: "Áp lực thể lực lớn khi phải đứng suốt ca làm việc và luôn phải giữ nụ cười trên môi dù gặp khách hàng vô lý." },
                { icon: "🌊", title: "Dễ bị ảnh hưởng bởi biến động vĩ mô (Dịch bệnh, thiên tai)", desc: "Ngành du lịch là ngành đầu tiên chịu thiệt hại nặng nề khi có dịch bệnh, chiến tranh hoặc suy thoái kinh tế toàn cầu." }
            ],
            salary: {
                entry: "7 – 11 Triệu / tháng",
                experienced: "22 – 40 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: Chưa bao gồm tiền Tip (boa) của du khách và tiền thưởng dịch vụ (Service Charge). Tổng quản lý khách sạn 5 sao có mức lương từ 60–100 triệu/tháng.",
                entryBarPercent: 28,
                expBarPercent: 82
            },
            closingQuestion: "Bạn có sẵn sàng đi làm vui vẻ vào đêm Giao thừa hay dịp lễ Tết để mang lại kỳ nghỉ trọn vẹn cho những du khách xa lạ không?"
        },

        "Ngôn ngữ học & Biên phiên dịch quốc tế": {
            id: "nn_pd",
            name: "Ngôn ngữ học & Biên phiên dịch quốc tế",
            combos: [
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Phổ biến nhất (Môn Anh x2)", isPrimary: true },
                { code: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Nhiều trường ngoại ngữ", isPrimary: false },
                { code: "D15", subjects: "Ngữ văn · Địa lí · Tiếng Anh", tag: "Một số trường xét tuyển", isPrimary: false },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Khối xét tuyển mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Môn Ngoại ngữ nhân hệ số 2", isPopular: true },
                { combo: "D14", subjects: "Ngữ văn · Lịch sử · Tiếng Anh", tag: "Một số trường", isPopular: false },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Tiếng Anh / Ngoại ngữ chuyên ngành — Điểm thi môn Ngoại ngữ thường nhân hệ số 2 và đòi hỏi trình độ đầu vào tương đương IELTS 6.0+ để học tốt.",
            coreSubjectAlert: {
                subject: "Ngoại ngữ chuyên sâu & Vốn tiếng Việt giàu có",
                reason: "Để dịch hay, không chỉ giỏi tiếng nước ngoài mà tiếng mẹ đẻ (Tiếng Việt) phải cực kỳ phong phú, am hiểu thành ngữ và văn cảnh văn hóa."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Ngoại ngữ - ĐHQGHN, ĐH Hà Nội, ĐH Ngoại ngữ Đà Nẵng, ĐH Sư phạm TP.HCM là những cái nôi đào tạo dịch thuật hàng đầu.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Hầu hết các trường ưu tiên xét tuyển thẳng thí sinh có chứng chỉ IELTS từ 6.5 – 7.5 trở lên."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Ngôn ngữ cơ sở & Phát âm chuẩn", desc: "Ngữ âm - Âm vị học, Ngữ pháp chuyên sâu, Kỹ năng Nghe - Nói - Đọc - Viết học thuật." },
                    { year: "Năm 2", stage: "Văn hóa & Ngôn ngữ học đối chiếu", desc: "Đất nước học (Anh/Mỹ/Trung/Nhật), Ngữ nghĩa học, Dẫn luận ngôn ngữ học, Ngoại ngữ 2." },
                    { year: "Năm 3", stage: "Lý thuyết & Kỹ hành dịch thuật", desc: "Lý thuyết dịch thuật, Dịch văn bản kinh tế - thương mại, Dịch đuổi (Consecutive Interpreting)." },
                    { year: "Năm 4", stage: "Dịch cabin & Thực tập dịch thuật", desc: "Dịch song song (Simultaneous/Cabin), Dịch hội nghị quốc tế, Thực tập tại cơ quan ngoại giao/doanh nghiệp." }
                ],
                plainExplanation: "Cầu nối ngôn ngữ và văn hóa toàn cầu: chuyển tải chính xác tư tưởng, cảm xúc và thông điệp giữa các quốc gia — từ dịch sách báo, tài liệu pháp lý chuyên sâu đến dịch cabin tại các hội nghị thượng đỉnh quốc tế.",
                tools: ["Trados Studio (CAT Tool)", "MemoQ", "Grammarly Business", "DeepL Pro", "Tai nghe chống ồn chuyên dụng dịch Cabin"],
                skills: [
                    { icon: "🗣️", name: "Dịch cabin (Dịch song song) thần tốc", desc: "Dịch trực tiếp lời diễn giả nói trong cabin với độ trễ chỉ 2–3 giây" },
                    { icon: "📚", name: "Biên dịch tài liệu chuyên ngành sâu", desc: "Dịch chính xác thuật ngữ y tế, pháp lý, hàng hải mà không làm mất đi hàm ý gốc" },
                    { icon: "🌍", name: "Am hiểu sâu sắc văn hóa bản địa", desc: "Hiểu đúng tiếng lóng, lối nói ẩn dụ và sự khác biệt văn hóa để tránh dịch ngô nghê" },
                    { icon: "💻", name: "Ứng dụng công cụ CAT Tool & Hậu kiểm AI", desc: "Làm chủ bộ nhớ dịch thuật (Translation Memory) và chỉnh sửa bản dịch máy (MTPE)" }
                ]
            },
            harshRealities: [
                { icon: "🎧", title: "Áp lực dịch trực tiếp (Cabin) căng thẳng đến nghẹt thở", desc: "Bộ não phải nghe, xử lý ngôn ngữ và nói ra liên tục trong vài giây; một lỗi dịch sai có thể gây hiểu lầm ngoại giao nghiêm trọng." },
                { icon: "🤖", title: "Công cụ dịch máy (AI, DeepL, ChatGPT) đe dọa phân khúc cơ bản", desc: "Các công việc dịch tài liệu ngắn đơn giản đang bị AI thay thế; biên dịch viên buộc phải nâng cao chuyên môn y khoa, luật mới có việc làm giá trị cao." },
                { icon: "📖", title: "Bắt buộc am hiểu kiến thức chuyên ngành sâu", desc: "Muốn có thu nhập cao phải am hiểu tường tận kiến thức ngành hẹp (hợp đồng dầu khí, sở hữu trí tuệ, cơ khí chế tạo) chứ không chỉ biết từ vựng chung chung." }
            ],
            salary: {
                entry: "8 – 13 Triệu / tháng",
                experienced: "25 – 45 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Phiên dịch viên cabin tại các hội nghị quốc tế nhận mức thù lao từ $200 – $500 / ngày làm việc.",
                entryBarPercent: 30,
                expBarPercent: 86
            },
            closingQuestion: "Bạn có tự tin vừa lắng nghe một diễn giả nói tiếng nước ngoài vừa dịch lại lưu loát bằng tiếng Việt với độ trễ chỉ 2 giây không?"
        },

        "Logistics & Quản trị chuỗi cung ứng": {
            id: "logistics",
            name: "Logistics & Quản trị chuỗi cung ứng",
            combos: [
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Phổ biến nhất (70% chỉ tiêu)", isPrimary: true },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Khối xét tuyển trọng tâm", isPrimary: false },
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Nhiều trường kỹ thuật", isPrimary: false },
                { code: "D07", subjects: "Toán · Hóa học · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Phổ biến nhất", isPopular: true },
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Ưu tiên khối Kinh tế", isPopular: true },
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Một số trường", isPopular: false }
            ],
            coreSubjectWarning: "Tiếng Anh & Toán tư duy tối ưu — Bắt buộc phải thông thạo thuật ngữ Incoterms, chứng từ vận tải quốc tế và thuật toán tối ưu hóa tuyến đường giao hàng.",
            coreSubjectAlert: {
                subject: "Tiếng Anh thương mại & Toán tối ưu hóa",
                reason: "Giao dịch hàng ngày với các hãng tàu, đại lý cảng biển toàn cầu bằng 100% tiếng Anh; tư duy số học giúp cắt giảm chi phí kho vận."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: ĐH Ngoại thương, ĐH Kinh tế Quốc dân, ĐH Giao thông Vận tải TP.HCM, ĐH Hàng hải điểm chuẩn dao động từ 22 – 27.5 điểm.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Ưu tiên chứng chỉ ngoại ngữ IELTS và điểm thi ĐGNL ĐHQG để xét tuyển sớm."
            },
            curriculum: {
                duration: "4 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Kinh tế vận tải", desc: "Toán cao cấp, Kinh tế vi mô, Nhập môn Logistics & Chuỗi cung ứng, Địa lý vận tải." },
                    { year: "Năm 2", stage: "Nghiệp vụ Ngoại thương & Kho bãi", desc: "Quản trị kho hàng & tồn kho, Vận tải đa phương thức, Giao nhận hàng hóa quốc tế, Incoterms." },
                    { year: "Năm 3", stage: "Chuỗi cung ứng & Hải quan", desc: "Thủ tục khai báo Hải quan điện tử, Thu mua (Procurement), Quản trị chuỗi cung ứng toàn cầu, Phần mềm ERP." },
                    { year: "Năm 4", stage: "Thực tập hãng tàu & Cảng biển", desc: "Thực tập tại công ty Forwarder / Hãng tàu / Cảng biển ICD, Đồ án giải pháp chuỗi cung ứng." }
                ],
                plainExplanation: "Tổng công trình sư điều phối dòng chảy hàng hóa toàn cầu: làm sao để một chiếc điện thoại sản xuất tại Bắc Ninh có mặt tại cửa hàng New York đúng giờ với chi phí vận chuyển rẻ nhất.",
                tools: ["Phần mềm Khai hải quan ECUS5-VNACCS", "Hệ thống quản lý kho WMS", "Hệ thống quản lý vận tải TMS", "SAP ERP", "Excel Solver"],
                skills: [
                    { icon: "🚢", name: "Nghiệp vụ xuất nhập khẩu & Chứng từ", desc: "Soạn thảo và kiểm tra Vận đơn (Bill of Lading), Hóa đơn thương mại, C/O xuất xứ" },
                    { icon: "📦", name: "Quản trị tồn kho & Vận hành kho bãi", desc: "Tối ưu hóa diện tích xếp hàng trong kho và tính toán điểm đặt hàng lại (ROP)" },
                    { icon: "🤝", name: "Đàm phán cước tàu & Hãng vận chuyển", desc: "Thương lượng giá cước container với các hãng tàu Maersk, MSC, ONE để tối ưu chi phí" },
                    { icon: "🌐", name: "Xử lý sự cố logistics quốc tế", desc: "Giải quyết nhanh chóng các tình huống nghẽn cảng, thất lạc hàng hoặc trễ chuyến bay" }
                ]
            },
            harshRealities: [
                { icon: "🚢", title: "Áp lực tắc cảng, lệch tàu, hàng trễ giờ và khách khiếu nại", desc: "Chuỗi cung ứng toàn cầu rất dễ đứt gãy; tàu hoãn chuyến hoặc hải quan kiểm tra đột xuất khiến hàng bị chậm trễ gây stress tột độ." },
                { icon: "🌙", title: "Trực theo dõi đơn hàng xuyên đêm do lệch múi giờ quốc tế", desc: "Khi làm việc với đối tác châu Âu hoặc Mỹ, nhân viên xuất nhập khẩu thường xuyên phải kiểm tra email và giải quyết sự cố lúc nửa đêm." },
                { icon: "🏭", title: "Môi trường làm việc kho bãi/cảng nhiều áp lực thực tế", desc: "Vị trí hiện trường tại cảng biển hoặc kho ngoại quan đòi hỏi phơi nắng gió, kiểm tra container bụi bặm và đối mặt nhiều áp lực kiểm kê." }
            ],
            salary: {
                entry: "8 – 14 Triệu / tháng",
                experienced: "28 – 50 Triệu / tháng",
                multiplier: "×3.2",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Quản lý chuỗi cung ứng (Supply Chain Manager) tại các tập đoàn sản xuất lớn có mức lương từ 60–100 triệu/tháng.",
                entryBarPercent: 32,
                expBarPercent: 88
            },
            closingQuestion: "Bạn có đủ nhạy bén và bình tĩnh để điều phối hàng trăm chuyến container hàng hóa vượt đại dương đến đúng đích không chậm một phút không?"
        },

        "Hàng không & Hàng hải": {
            id: "hk_hh",
            name: "Hàng không & Hàng hải",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Kỹ thuật Hàng không/Hàng hải", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Hàng không", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Quản lý hoạt động bay/Cảng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Khối Kỹ thuật trọng tâm", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên Hàng không", isPopular: true },
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Một số ngành", isPopular: false }
            ],
            coreSubjectWarning: "Sức khỏe loại 1 & Tiếng Anh chuẩn ICAO — Bắt buộc phải có thị lực hoàn hảo, sức khỏe tim mạch đỉnh cao và phản xạ ngôn ngữ hàng không quốc tế nhanh nhạy.",
            coreSubjectAlert: {
                subject: "Sức khỏe loại 1 & Tiếng Anh chuẩn ICAO",
                reason: "Tiêu chuẩn kiểm tra sức khỏe phi công và thuyền trưởng cực kỳ khắt khe; tiếng Anh chuyên ngành hàng không/hàng hải là bắt buộc để liên lạc vô tuyến."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Học viện Hàng không Việt Nam, ĐH Hàng hải Việt Nam, ĐH Bách Khoa (Kỹ thuật Hàng không) là các địa chỉ đào tạo chuyên sâu.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Thí sinh thi phi công cần chuẩn bị chi phí đào tạo thực hành bay khá lớn hoặc tham gia chương trình tài trợ của các hãng hàng không."
            },
            curriculum: {
                duration: "4 – 5 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Khí động lực học", desc: "Toán cao cấp, Vật lý, Khí động học đại cương, Luật hàng không/hàng hải quốc tế." },
                    { year: "Năm 2", stage: "Hệ thống máy bay & Dẫn đường", desc: "Kết cấu máy bay/tàu thủy, Thiết bị dẫn đường vô tuyến, Khí tượng hàng không/hàng hải." },
                    { year: "Năm 3", stage: "Quản lý bay & Buồng lái giả lập", desc: "Huấn luyện buồng lái mô phỏng (Simulator), Quy trình kiểm soát không lưu (ATC), Xử lý khẩn nguy." },
                    { year: "Năm 4-5", stage: "Thực hành bay/Đi biển & Bằng lái", desc: "Huấn luyện thực hành bay lấy chứng chỉ CPL/ATPL hoặc đi thực tập thực tế trên các tàu viễn dương." }
                ],
                plainExplanation: "Làm chủ bầu trời và đại dương bao la: điều khiển những cỗ máy bay khổng lồ kết nối các châu lục hoặc chỉ huy những con tàu viễn dương vượt sóng gió đại dương.",
                tools: ["Buồng lái mô phỏng bay (Full Flight Simulator)", "Hệ thống radar kiểm soát không lưu ATC", "Bản đồ hàng hải điện tử ECDIS", "Hệ thống định vị GPS/GLONASS"],
                skills: [
                    { icon: "✈️", name: "Làm chủ kỹ thuật bay & Điều hướng", desc: "Thao tác chính xác các hệ thống điện tử buồng lái và điều khiển máy bay trong mọi thời tiết" },
                    { icon: "🧠", name: "Bình tĩnh xử lý tình huống khẩn nguy", desc: "Xử lý chuẩn xác quy trình khi gặp sự cố động cơ, thời tiết xấu hoặc hỏng hóc thiết bị" },
                    { icon: "📻", name: "Liên lạc đối thoại chuẩn ICAO/IMO", desc: "Giao tiếp vô tuyến bằng tiếng Anh chuẩn xác, ngắn gọn, không gây hiểu lầm với đài kiểm soát" },
                    { icon: "🧭", name: "Định vị thiên văn & Khí tượng học", desc: "Đọc hiểu bản đồ mây radar thời tiết để chọn đường bay/tuyến hải trình êm ái, an toàn nhất" }
                ]
            },
            harshRealities: [
                { icon: "💰", title: "Chi phí đào tạo phi công rất cao (Hàng tỷ đồng)", desc: "Khóa học đào tạo thực hành bay lấy bằng phi công thương mại (CPL) đòi hỏi ngân sách đầu tư rất lớn từ phía gia đình." },
                { icon: "✈️", title: "Xa nhà dài ngày, lệch múi giờ, ảnh hưởng nhịp sinh học", desc: "Phi công và thuyền viên thường xuyên bay xuyên múi giờ, lênh đênh trên biển nhiều tháng liền xa cách gia đình và bạn bè." },
                { icon: "🩺", title: "Kiểm tra sức khỏe và thi sát hạch định kỳ cực kỳ nghiêm ngặt", desc: "Cứ mỗi 6–12 tháng đều phải kiểm tra lại sức khỏe và thi sát hạch buồng lái mô phỏng; nếu không đạt chuẩn sẽ bị đình chỉ bay ngay lập tức." }
            ],
            salary: {
                entry: "15 – 30 Triệu / tháng",
                experienced: "60 – 120+ Triệu / tháng",
                multiplier: "×3.5",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Cơ trưởng (Captain) máy bay thương mại thân rộng (A350, Boeing 787) có mức thu nhập từ 150 – 250+ triệu/tháng.",
                entryBarPercent: 45,
                expBarPercent: 98
            },
            closingQuestion: "Bạn có dám gánh vác trách nhiệm sinh mạng của hàng trăm hành khách trên chuyến bay ở độ cao 10,000 mét giữa giông bão không?"
        }
    };

    // Helper chuẩn hóa tìm kiếm ngành linh hoạt
    function normalizeStr(str) {
        if (!str) return '';
        return str.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D')
            .replace(/[^a-z0-9]/g, ' ')
            .trim();
    }

    function getCareerInsight(careerName) {
        if (!careerName) {
            return getDefaultInsight('Chưa xác định');
        }

        // 1. Khớp chính xác theo key
        if (CAREER_INSIGHTS[careerName]) {
            return CAREER_INSIGHTS[careerName];
        }

        // 2. Khớp chuỗi mờ (fuzzy matching)
        const target = normalizeStr(careerName);
        for (const [key, data] of Object.entries(CAREER_INSIGHTS)) {
            const kNorm = normalizeStr(key);
            if (kNorm.includes(target) || target.includes(kNorm)) {
                return data;
            }
        }

        // 3. Khớp theo từ khóa đặc trưng
        if (target.includes('tin') || target.includes('phan mem') || target.includes('lap trinh') || target.includes('cntt') || target.includes('an toan thong tin')) {
            return CAREER_INSIGHTS["Công nghệ thông tin & Lập trình phần mềm"];
        }
        if (target.includes('khoa hoc may tinh') || target.includes('tri tue nhan tao') || target.includes('ai') || target.includes('du lieu')) {
            return CAREER_INSIGHTS["Khoa học máy tính & Trí tuệ nhân tạo (AI)"];
        }
        if (target.includes('kinh te') || target.includes('quan tri') || target.includes('marketing') || target.includes('kinh doanh') || target.includes('thuong mai')) {
            return CAREER_INSIGHTS["Kinh tế / Quản trị kinh doanh & Marketing"];
        }
        if (target.includes('tai chinh') || target.includes('ngan hang') || target.includes('ke toan') || target.includes('kiem toan')) {
            return CAREER_INSIGHTS["Tài chính - Ngân hàng & Kế toán - Kiểm toán"];
        }
        if (target.includes('y khoa') || target.includes('duoc') || target.includes('bac si') || target.includes('y te') || target.includes('suc khoe')) {
            return CAREER_INSIGHTS["Y khoa / Dược học & Khoa học sức khỏe"];
        }
        if (target.includes('dieu duong') || target.includes('y sinh')) {
            return CAREER_INSIGHTS["Điều dưỡng & Kỹ thuật Y sinh"];
        }
        if (target.includes('co dien tu') || target.includes('tu dong hoa') || target.includes('co khi') || target.includes('o to')) {
            return CAREER_INSIGHTS["Kỹ thuật / Cơ điện tử & Tự động hóa"];
        }
        if (target.includes('dien') || target.includes('dien tu') || target.includes('nang luong')) {
            return CAREER_INSIGHTS["Điện - Điện tử & Năng lượng tái tạo"];
        }
        if (target.includes('kien truc') || target.includes('noi that')) {
            return CAREER_INSIGHTS["Kiến trúc & Thiết kế nội thất"];
        }
        if (target.includes('xay dung') || target.includes('cau duong') || target.includes('du an')) {
            return CAREER_INSIGHTS["Xây dựng & Quản lý dự án"];
        }
        if (target.includes('nong nghiep') || target.includes('thuc pham')) {
            return CAREER_INSIGHTS["Nông nghiệp công nghệ cao & Công nghệ thực phẩm"];
        }
        if (target.includes('moi truong') || target.includes('sinh thai') || target.includes('ben vung')) {
            return CAREER_INSIGHTS["Môi trường & Khoa học bền vững"];
        }
        if (target.includes('luat') || target.includes('ngoai giao') || target.includes('xa hoi')) {
            return CAREER_INSIGHTS["Luật / Ngoại giao & Khoa học xã hội"];
        }
        if (target.includes('cong an') || target.includes('quan doi') || target.includes('canh sat') || target.includes('an ninh')) {
            return CAREER_INSIGHTS["Công an & Quân đội"];
        }
        if (target.includes('su pham') || target.includes('giao duc') || target.includes('giao vien')) {
            return CAREER_INSIGHTS["Sư phạm & Quản lý giáo dục"];
        }
        if (target.includes('tam ly') || target.includes('tham van')) {
            return CAREER_INSIGHTS["Tâm lý học & Dịch vụ tham vấn / Xã hội"];
        }
        if (target.includes('truyen thong') || target.includes('bao chi') || target.includes('pr')) {
            return CAREER_INSIGHTS["Truyền thông / Báo chí & Quan hệ công chúng (PR)"];
        }
        if (target.includes('thiet ke') || target.includes('do hoa') || target.includes('my thuat') || target.includes('multimedia')) {
            return CAREER_INSIGHTS["Thiết kế đồ họa / Mỹ thuật số & Đa phương tiện"];
        }
        if (target.includes('am nhac') || target.includes('bieu dien') || target.includes('nghe thuat') || target.includes('san khau')) {
            return CAREER_INSIGHTS["Âm nhạc, Biểu diễn & Nghệ thuật sân khấu"];
        }
        if (target.includes('the thao') || target.includes('van dong') || target.includes('the chat')) {
            return CAREER_INSIGHTS["Thể thao & Khoa học vận động"];
        }
        if (target.includes('du lich') || target.includes('khach san') || target.includes('am thuc') || target.includes('f&b')) {
            return CAREER_INSIGHTS["Du lịch / Quản trị khách sạn & Dịch vụ F&B"];
        }
        if (target.includes('ngon ngu') || target.includes('bien dich') || target.includes('phien dich')) {
            return CAREER_INSIGHTS["Ngôn ngữ học & Biên phiên dịch quốc tế"];
        }
        if (target.includes('logistics') || target.includes('chuoi cung ung') || target.includes('xuat nhap khau')) {
            return CAREER_INSIGHTS["Logistics & Quản trị chuỗi cung ứng"];
        }
        if (target.includes('hang khong') || target.includes('hang hai') || target.includes('phi cong') || target.includes('thuyen truong')) {
            return CAREER_INSIGHTS["Hàng không & Hàng hải"];
        }

        // 4. Trả về cấu trúc mặc định an toàn nếu không khớp
        return getDefaultInsight(careerName);
    }

    function getDefaultInsight(name) {
        return {
            id: "general",
            name: name || "Ngành đào tạo chuyên môn",
            combos: [
                { code: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPrimary: true },
                { code: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên khối Kỹ thuật - Kinh tế", isPrimary: false },
                { code: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Tổ hợp mở rộng", isPrimary: false }
            ],
            admissionCombos: [
                { combo: "A00", subjects: "Toán · Vật lí · Hóa học", tag: "Phổ biến nhất", isPopular: true },
                { combo: "A01", subjects: "Toán · Vật lí · Tiếng Anh", tag: "Ưu tiên xét tuyển", isPopular: true },
                { combo: "D01", subjects: "Toán · Ngữ văn · Tiếng Anh", tag: "Tổ hợp mở rộng", isPopular: false }
            ],
            coreSubjectWarning: "Toán học & Ngoại ngữ — Nền tảng tư duy logic và công cụ hội nhập quốc tế then chốt trong mọi lĩnh vực nghề nghiệp hiện đại.",
            coreSubjectAlert: {
                subject: "Toán học & Tiếng Anh",
                reason: "Cần nắm vững kiến thức căn bản của các môn thế mạnh để đáp ứng yêu cầu đào tạo chuyên môn tại giảng đường đại học."
            },
            schoolAdvice: {
                abilityFit: "Chọn trường VỪA SỨC MÌNH: Ưu tiên các trường có điểm chuẩn các năm trước thấp hơn điểm thi thử của bạn từ 1.0 – 1.5 điểm để an toàn nguyện vọng.",
                admissionNotice: "Tra ĐỀ ÁN TUYỂN SINH: Mỗi trường mỗi khác về chứng chỉ ngoại ngữ quy đổi, tiêu chí phụ xét môn chính và phân bổ chỉ tiêu từng phương thức."
            },
            curriculum: {
                duration: "4 – 5 NĂM",
                timeline: [
                    { year: "Năm 1", stage: "Đại cương & Nền tảng", desc: "Toán cao cấp, Nhập môn ngành, Kỹ năng học đại học và Tiếng Anh căn bản." },
                    { year: "Năm 2", stage: "Cơ sở chuyên môn & Công cụ", desc: "Nguyên lý chuyên ngành, Làm quen công cụ và phần mềm thực tế." },
                    { year: "Năm 3", stage: "Chuyên sâu & Đồ án thực chiến", desc: "Nghiên cứu ứng dụng bài toán thực tế, Thực hành đồ án môn học theo nhóm." },
                    { year: "Năm 4-5", stage: "Thực tập & Tốt nghiệp", desc: "Thực tập tại doanh nghiệp đối tác, Khóa luận tốt nghiệp và đi làm." }
                ],
                plainExplanation: "Được đào tạo toàn diện kiến thức nền tảng khoa học, nguyên lý vận hành chuyên môn và tham gia các kỳ thực tập thực chiến tại doanh nghiệp.",
                tools: ["Bộ công cụ số chuyên ngành", "Phần mềm mô phỏng", "Nền tảng quản lý dự án số"],
                skills: [
                    { icon: "🧩", name: "Tư duy phản biện & Giải quyết vấn đề", desc: "Phân tích và tìm kiếm giải pháp tối ưu cho các thách thức thực tế" },
                    { icon: "💻", name: "Ứng dụng công nghệ vào chuyên môn", desc: "Thành thạo công cụ số và phần mềm chuyên môn trong công việc" },
                    { icon: "🤝", name: "Kỹ năng làm việc nhóm & Thuyết trình", desc: "Giao tiếp rõ ràng, phối hợp hiệu quả và trình bày ý tưởng tự tin" },
                    { icon: "🌐", name: "Ngoại ngữ chuyên ngành vững vàng", desc: "Tự tin đọc hiểu tài liệu và giao tiếp trong môi trường quốc tế" }
                ]
            },
            harshRealities: [
                { icon: "⏰", title: "Áp lực chỉ tiêu & Tiến độ công việc", desc: "Phải làm quen với cường độ công việc cao và kỹ năng xử lý các sự cố phát sinh bất ngờ." },
                { icon: "📚", title: "Yêu cầu không ngừng tự học nâng cao tay nghề", desc: "Sự phát triển của công nghệ và AI đòi hỏi người đi làm phải liên tục cập nhật năng lực để không bị đào thải." },
                { icon: "⚖️", title: "Cân bằng giữa công việc và cuộc sống cá nhân", desc: "Đòi hỏi kỷ luật cá nhân cao để tránh bị kiệt sức (burnout) trong những năm đầu khởi nghiệp." }
            ],
            salary: {
                entry: "8 – 13 Triệu / tháng",
                experienced: "25 – 45 Triệu / tháng",
                multiplier: "×3.0",
                note: "Chỉ để tham khảo: tùy công ty và kỹ năng. Phụ thuộc vào năng lực thực chiến, ngoại ngữ và quy mô doanh nghiệp.",
                entryBarPercent: 30,
                expBarPercent: 85
            },
            closingQuestion: "Bạn có thực sự tìm thấy niềm đam mê và sự hào hứng khi tìm hiểu về lĩnh vực ngành nghề này không?"
        };
    }

    // Expose ra toàn cục window
    if (typeof window !== 'undefined') {
        window.CAREER_INSIGHTS_DATA = CAREER_INSIGHTS;
        window.getCareerInsight = getCareerInsight;
        window.CAREER_CONSULTATION_KB = CAREER_INSIGHTS; // Alias cho Chatbot
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            CAREER_INSIGHTS_DATA: CAREER_INSIGHTS,
            getCareerInsight: getCareerInsight
        };
    }
})();
