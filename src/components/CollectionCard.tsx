import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="y2k-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <CardContent className="p-0">
        <div className="aspect-[21/9] bg-black/40 overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
              No image
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-white font-black text-3xl md:text-4xl y2k-glow-text">
                {collection.name}
              </h3>
              {collection.featured && (
                <span className="bg-y2k-cyan/20 backdrop-blur-sm text-y2k-cyan text-xs px-3 py-1 rounded-full font-bold border border-y2k-cyan/30">
                  FEATURED
                </span>
              )}
            </div>
            
            {collection.description && (
              <p className="text-gray-300 text-base md:text-lg mb-4 max-w-xl">
                {collection.description}
              </p>
            )}
            
            <Button 
              className="y2k-button text-y2k-black font-bold w-fit px-6"
              onClick={() => onViewProducts(collection.id)}
            >
              View Collection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}