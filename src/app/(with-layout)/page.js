import Banner from '@/components/Banner'
import ProductSlider from '@/components/ProductSlider'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Banner />
      <ProductSlider />
    </main>
  )
}
