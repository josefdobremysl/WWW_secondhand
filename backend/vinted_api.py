from pyVinted import Vinted

def search_vinted(keywords: str, min_price: float, max_price: float):
    """
    library pyVinted.
    """
    vinted = Vinted()

    try:
         
        url = f"https://www.vinted.fr/vetement?search_text={keywords}&price_from={min_price}&price_to={max_price}&order=newest_first"

        # search items (first 20 first page)
        results = vinted.items.search(url, 20, 1)

        
        items = []
        for item in results:
            items.append({
                "title": item.title,
                "price": str(item.price),
                "currency": item.currency,
                "image": item.photo,  
                "url": item.url,
            })


        return items

    except Exception as e:
        print(f"Error using pyVinted: {e}")
        return []
