import InventoryManager from "@/components/Admin_component/Inventory/InventoryManager/InventoryManager";

function Inventory_page({ isMenuOpen, setIsMenuOpen }) {
  return (

    
    <div>
      
      <InventoryManager isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}

export default Inventory_page;