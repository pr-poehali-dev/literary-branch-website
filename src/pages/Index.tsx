import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, text });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Литературный Бранч</h1>
          <div className="flex gap-6">
            <a href="#submit" className="text-sm hover:text-accent transition-colors">Прислать текст</a>
            <a href="#reviews" className="text-sm hover:text-accent transition-colors">Разборы</a>
            <a href="#about" className="text-sm hover:text-accent transition-colors">О проекте</a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://cdn.poehali.dev/projects/9765969d-c217-4f56-8b0d-cc8f4c6fc125/files/846f71c1-541c-42a9-942f-ac28dd43b966.jpg')"
          }}
        />
        <div className="container relative mx-auto px-4 py-20 text-center animate-fade-in">
          <h2 className="text-6xl font-bold mb-6 tracking-tight">
            Место, где рождаются<br />литературные голоса
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Благотворительный проект поддержки молодых писателей. Делимся опытом, даём обратную связь, вдохновляем на творчество.
          </p>
        </div>
      </section>

      <section id="submit" className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Прислать текст</CardTitle>
            <CardDescription className="text-base">
              Поделитесь своим произведением, и мы дадим профессиональную обратную связь
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Ваше имя
                </label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="text" className="text-sm font-medium">
                  Ваш текст
                </label>
                <Textarea
                  id="text"
                  placeholder="Вставьте ваш текст здесь..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] resize-y"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 text-base font-medium"
              >
                Отправить на рассмотрение
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <section id="reviews" className="bg-secondary/30 py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши разборы</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Работа с диалогами",
                author: "Анна С.",
                excerpt: "Как сделать диалоги живыми и естественными. Разбор частых ошибок начинающих авторов.",
                date: "15 октября 2024"
              },
              {
                title: "Структура короткого рассказа",
                author: "Михаил К.",
                excerpt: "Анализ композиции и ритма в современной малой прозе. Практические советы.",
                date: "8 октября 2024"
              },
              {
                title: "Создание атмосферы",
                author: "Елена Р.",
                excerpt: "Техники работы с деталями и описаниями для создания уникального настроения текста.",
                date: "1 октября 2024"
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="Calendar" size={16} />
                    <span>{review.date}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{review.title}</CardTitle>
                  <CardDescription>Автор: {review.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.excerpt}</p>
                  <Button variant="link" className="mt-4 px-0 text-accent hover:text-accent/80">
                    Читать полностью →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">О проекте</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "Heart",
                title: "Благотворительность",
                description: "Все услуги предоставляются бесплатно. Мы верим в силу литературы и поддерживаем начинающих авторов."
              },
              {
                icon: "Users",
                title: "Сообщество",
                description: "Объединяем писателей, редакторов и литературных критиков для обмена опытом."
              },
              {
                icon: "BookOpen",
                title: "Обучение",
                description: "Проводим мастер-классы, литературные разборы и даём профессиональную обратную связь."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 border-2 hover:border-accent transition-colors animate-scale-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <Icon name={item.icon} size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Миссия проекта</h3>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
              Литературный Бранч создан для того, чтобы талантливые писатели получили поддержку 
              на начальном этапе своего творческого пути. Мы помогаем развивать навыки, 
              находить свой уникальный голос и верить в себя.
            </p>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Литературный Бранч</h3>
          <p className="text-muted-foreground mb-6">
            Благотворительный проект поддержки молодых писателей
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Mail" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="MessageCircle" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            © 2024 Литературный Бранч. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;