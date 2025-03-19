export async function GET() {
  const data = [
    {
      id: "1",
      title: "Laptop Dell XPS 13",
      description:
        "Máy tính xách tay cao cấp với màn hình 13 inch, hiệu suất mạnh mẽ.",
    },
    {
      id: "2",
      title: "iPhone 14 Pro",
      description: "Điện thoại thông minh mới nhất của Apple với camera 48MP.",
    },
    {
      id: "3",
      title: "Tai nghe Sony WH-1000XM5",
      description:
        "Tai nghe chống ồn hàng đầu với chất lượng âm thanh tuyệt vời.",
    },
    {
      id: "4",
      title: "Máy ảnh Canon EOS R5",
      description:
        "Máy ảnh không gương lật chuyên nghiệp với khả năng quay video 8K.",
    },
    {
      id: "5",
      title: "Samsung Galaxy Watch 6",
      description:
        "Đồng hồ thông minh với tính năng theo dõi sức khỏe nâng cao.",
    },
    {
      id: "6",
      title: "Máy chơi game PS5",
      description:
        "Console thế hệ mới với đồ họa chân thực và tốc độ tải nhanh.",
    },
    {
      id: "7",
      title: "Loa Bluetooth JBL Charge 5",
      description: "Loa di động với âm thanh mạnh mẽ và pin lâu.",
    },
    {
      id: "8",
      title: "Bàn phím cơ Keychron K8",
      description:
        "Bàn phím cơ không dây với thiết kế tối giản và cảm giác gõ tốt.",
    },
    {
      id: "9",
      title: "Màn hình LG UltraWide 34 inch",
      description: "Màn hình cong siêu rộng dành cho làm việc và giải trí.",
    },
    {
      id: "10",
      title: "Chuột Logitech MX Master 3S",
      description:
        "Chuột văn phòng cao cấp với độ chính xác cao và thiết kế tiện lợi.",
    },
  ];
  return Response.json(data);
}
