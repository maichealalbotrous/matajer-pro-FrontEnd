export   const mockApiResponse = {
    "success": true,
    "statistics": {
      "total_count": 2,
      "pending_count": 1,
      "approved_count": 1
    },
    "data": [
      {
        "id": 2,
        "branch_id": 1,
        "user_id": 1,
        "total_amount": "1800.00",
        "status": "pending",
        "type": "sale",
        "notes": "طلب تجريبي لزبون جديد",
        "invoice_date": "2026-03-31",
        "user": { "id": 1, "name": "michael", "phone": "0930942741" },
        "invoice_items": [ 
          {
            "variant": { "variant_name": "Hodei one", "color": "kh", "product": { "model_name": "hodeis" } },
            "quantity": 2,
            "sold_at_price": "900.00"
          }
        ]
      },
      {
        "id": 1,
        "branch_id": 1,
        "user_id": 1,
        "total_amount": "200.00",
        "status": "approved",
        "type": "sale",
        "notes": "تم الاعتماد مسبقاً",
        "invoice_date": "2026-03-31",
        "user": { "id": 1, "name": "michael", "phone": "0930942741" },
        "invoice_items": []
      }
    ]
  };